import { Alert, FormRow } from '../components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
// import Logo from '../components';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const { isLoading, showAlert, displayAlert, user, setupUser } =
    useAppContext();

  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    //dynamic object keys
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isMember, name, email, password } = values;
    if ((!isMember && !name) || !email || !password) {
      // if((!isMember && name==='') || email==='' || password==='') displayAlert();
      displayAlert();
    }

    const currentUser = { name, email, password };
    if (isMember) {
      currentUser.name = undefined;
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful! Redirecting...',
      });
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created! Redirecting...',
      });
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        {/* <Logo /> */}

        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow
            handleChange={handleChange}
            name={'name'}
            type={'text'}
            value={values.name}
          />
        )}

        {/* email input */}
        <FormRow
          handleChange={handleChange}
          name={'email'}
          type={'email'}
          value={values.email}
        />

        {/* password input */}
        <FormRow
          handleChange={handleChange}
          name={'password'}
          type={'password'}
          value={values.password}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit   
        </button>
        <button
          type='button'
          className='btn btn-block btn-demo'
          disabled={isLoading}
          onClick={() => {
            setupUser({
              currentUser: { email: 'test@mail.com', password: 'testing' },
              endPoint: 'login',
              alertText: 'Login Successful! Redirecting...',
            });
          }}
        >
          {isLoading ? 'loading...' : 'demo app'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' className='btn-toggle' onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
