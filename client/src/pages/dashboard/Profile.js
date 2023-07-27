import { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { Alert, FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  const { user, showAlert, isLoading, updateUser, displayAlert } =
    useAppContext();

  const [name, setName] = useState(user && user.name);
  const [lastName, setLastName] = useState(user && user.lastName);
  const [email, setEmail] = useState(user && user.email);
  const [location, setLocation] = useState(user && user.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !lastName || !email || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, lastName, email, location });
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
    </Wrapper>
  );
};
export default Profile;
