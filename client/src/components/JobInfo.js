import Wrapper from '../assets/wrappers/Job';

const JobInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='icon'>{icon} {text}</span>
    </Wrapper>
  );
};
export default JobInfo;
