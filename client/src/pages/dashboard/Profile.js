import { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { Alert, FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  const {
    user,
    showAlert,
    isLoading,
    updateUser,
    displayAlert,
    changePassword,
  } = useAppContext();

  const [name, setName] = useState(user && user.name);
  const [lastName, setLastName] = useState(user && user.lastName);
  const [email, setEmail] = useState(user && user.email);
  const [location, setLocation] = useState(user && user.location);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !lastName || !email || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, lastName, email, location });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    changePassword({ oldPass, newPass });
    setOldPass('');
    setNewPass('');
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}

        <div className='form-center'>
          {/* name added to FormRow just for consistency. not gonna use it. */}
          <FormRow
            handleChange={(e) => setName(e.target.value)}
            name='name'
            type='text'
            value={name}
          />
          <FormRow
            handleChange={(e) => setLastName(e.target.value)}
            labelText='Last Name'
            name='lastName'
            type='text'
            value={lastName}
          />
          <FormRow
            handleChange={(e) => setEmail(e.target.value)}
            name='email'
            type='email'
            value={email}
          />
          <FormRow
            handleChange={(e) => setLocation(e.target.value)}
            name='location'
            type='text'
            value={location}
          />

          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'Save Changes'}
          </button>
        </div>
      </form>
      <br />
      <br />
      {/* change pass */}
      <form className='form' onSubmit={handleSubmit}>
        <h3>Change Password</h3>

        <div className='form-center'>
          {/* name added to FormRow just for consistency. not gonna use it. */}
          <FormRow
            handleChange={(e) => setOldPass(e.target.value)}
            labelText='old password'
            name='oldPass'
            type='password'
            value={oldPass}
          />
          <FormRow
            handleChange={(e) => setNewPass(e.target.value)}
            labelText='new password'
            name='newPass'
            type='password'
            value={newPass}
          />

          <button
            className='btn btn-block'
            type='submit'
            disabled={isLoading}
            onClick={handlePasswordSubmit}
          >
            {isLoading ? 'Please Wait...' : 'change password'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
