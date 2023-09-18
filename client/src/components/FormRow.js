const FormRow = ({
  handleChange,
  labelText,
  name,
  type,
  value,
  maxLength,
  min,
}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
        {/* {labelText ? labelText : name} */}
      </label>
      <input
        type={type}
        className='form-input'
        name={name}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        min={min}
      />
    </div>
  );
};
export default FormRow;
