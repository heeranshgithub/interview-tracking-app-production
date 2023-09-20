import moment from 'moment';
import { useAppContext } from '../context/appContext';
import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaMoneyCheck,
} from 'react-icons/fa';

import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';

const Job = ({
  company,
  position,
  status,
  jobType,
  jobLocation,
  _id,
  interviewDate,
  stipend,
}) => {
  const { setEditJob, deleteJob } = useAppContext();

  const addCommas = (num) => {
    return num.toLocaleString('en-IN');
  };

  let date = moment(interviewDate);
  date = date.format('MMM Do, YYYY');
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{company}</h5>
          <p>{position}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <JobInfo icon={<FaMoneyCheck />} text={`₹${addCommas(stipend)}`} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              className='btn edit-btn'
              to='/add-job'
              onClick={() => setEditJob(_id)}
            >
              Edit
            </Link>
            <button
              className='btn delete-btn'
              type='button'
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Job;
