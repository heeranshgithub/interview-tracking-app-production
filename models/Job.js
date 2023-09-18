import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending', 'accepted'],
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'remote', 'internship'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: 'my city',
      required: true, //setting required to true even with default because there's an option to update a job. so, the user shouldn't leave it empty.
    }, //above not necessary in case of status & jobType because they need to be selected from a list. so, there will always be a value.
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    interviewDate: {
      type: Date,
      required: [true, 'Please provide interview date'],
    },
    stipend: {
      type: Number,
      required: [true, 'Please provide stipend amount'],
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', JobSchema);
