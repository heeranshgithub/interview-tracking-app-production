import notFoundImg from '../assets/images/not-found.svg';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  return (
    <Wrapper>
      <div className='container top'>
        <img src={notFoundImg} alt='notFound' className='img' />
      </div>
      <div className='container bottom'>
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <div className='linkDiv'>
          <Link to='/' className='link'>
            Back Home
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Error;
