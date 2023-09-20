import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment';

const createJob = async (req, res) => {
  const { company, position } = req.body;
  // console.log(typeof req.body);
  if (!company || !position) {
    throw new BadRequestError('Please provide all values!');
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.OK).json({ job });
  //gonna be difference b/w json(job) and json({job}). checked in postman.
  //in the first way response will be like {'all the values inside job'}
  //in the second way response will be like {job:{'all the values inside job'}}
};

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  //add stuff based on condition

  if (status && status !== 'all') {
    queryObject.status = status;
  }

  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.company = { $regex: search, $options: 'i' }; //'i' makes the query search case insensitive
  }

  //no await, therefore will return just the Query object
  console.log(queryObject);
  let result = Job.find(queryObject);

  //chain sort conditions
  if (sort === 'latest') {
    result.sort('-interviewDate');
  }

  if (sort === 'oldest') {
    result.sort('interviewDate');
  }

  if (sort === 'a-z') {
    result.sort('company');
  }

  if (sort === 'z-a') {
    result.sort('-company');
  }

  if (sort === 'stipend') {
    result.sort('-stipend');
  }

  const page = Number(req.query.page) || 1; //Number() because req.query come as string
  const limit = Number(req.query.limit) || 10; //will not send limit in the req.query for the moment and just gonna keep it as 10

  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit); //Math.ceil(3.14) = 4

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params; //jobId alias for id

  const { company, position } = req.body;

  if (!company || !position)
    throw new BadRequestError('please provide all values');

  const job = await Job.findOne({ _id: jobId });

  if (!job) throw new NotFoundError(`no job found with id ${jobId}`);

  //check permissions
  // console.log(typeof req.user.userId); userId a string
  // console.log(typeof job.createdBy);   createdBy an object
  checkPermissions(req.user, job.createdBy); //ensures that one user doesn't update another user's jobs

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true, //in-built option. when new:true, it will return the latest values.
    runValidators: true, //in-built option. it will runValidators for the req.body values
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) throw new NotFoundError(`no job found with id ${jobId}`);

  checkPermissions(req.user, job.createdBy);

  await job.deleteOne(); //deleteOne in-built method like save()
  res.status(StatusCodes.OK).json({ msg: 'job removed successfully!' });
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  // res.status(StatusCodes.OK).json({ stats });

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count; //dynamic object keys
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
    accepted: stats.accepted || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: '$interviewDate',
          },
          month: {
            $month: '$interviewDate',
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } }, //sorting in descending because want the latest
    { $limit: 6 }, //and then only taking 6 using limit
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = moment({ month: month - 1, year: year }).format('MMMM YYYY'); //subtracting 1 from month value to match Moment.js's month indexing (0-11)
      return { date, count };
    })
    .reverse(); //reversing because charts will go from left to right (old to new)

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
