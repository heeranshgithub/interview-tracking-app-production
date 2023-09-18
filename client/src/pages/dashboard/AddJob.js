import { FormRow, FormRowSelect, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    company,
    position,
    jobLocation,
    jobType,
    status,
    jobTypeOptions,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
    stipend,
    interviewDate,
  } = useAppContext();

  const [selectedDate, setSelectedDate] = useState(new Date(interviewDate));

  useEffect(() => {
    handleChange({ name: 'interviewDate', value: selectedDate.toISOString() });
    //disable next line because not putting handleChange in dependency array
    // eslint-disable-next-line
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!company || !position || !jobLocation) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editJob();
      setSelectedDate(new Date());
      return;
    }
    createJob();
    setSelectedDate(new Date());
  };

  const handleJobInput = (e) => {
    if (e.target.name === 'stipend') {
      handleChange({ name: e.target.name, value: parseInt(e.target.value) });
    } else {
      handleChange({ name: e.target.name, value: e.target.value });
    }
  };

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}

        <div className='form-center'>
          {/* {position} */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
            maxLength='50'
          />

          {/* {company} */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
            maxLength='50'
          />

          {/* {jobLocation} */}
          <FormRow
            type='text'
            labelText='location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />

          {/* {jobStatus} */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          {/* {jobType} */}
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          {/* interviewDate*/}
          <div>
            <label htmlFor='interviewDate' className='form-label'>
              Interview Date
            </label>
            <DatePicker
              name='interviewDate'
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className='date-picker'
              dateFormat='dd/MM/yyyy'
            />
          </div>

          {/* stipend */}
          <FormRow
            type='number'
            labelText='stipend per month (₹)'
            name='stipend'
            value={stipend}
            handleChange={handleJobInput}
            min='0'
          />

          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>

            <button
              className='btn btn-block clear-btn'
              type='button'
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
