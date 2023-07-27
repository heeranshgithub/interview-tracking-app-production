// import { Logo } from '../components';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const Landing = () => {
  const { user } = useAppContext();
  // const navigate = useNavigate();

  // useEffect(()=>{
  //   if(user){
  //     navigate('/');
  //   }
  // }, [user, navigate])

  return (
    <>
      {user ? (
        <Navigate to='/' />
      ) : (
        <Wrapper>
          <nav>
            {/* <Logo /> */}
          </nav>
          <div className='container page'>
            {/* info */}
            <div className='info'>
              <h1>
                Interview <br></br><span>Tracking</span> <br></br>App
              </h1>
              <p>
                 
              </p>
              <Link to='/register' className='btn btn-hero'>
                Login/Register
              </Link>
            </div>
            <img src={main} alt='job hunt' className='img main-img' />
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default Landing;
