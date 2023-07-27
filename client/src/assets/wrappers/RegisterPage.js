import styled from 'styled-components';

const RegisterPageWrapper = styled.section`
  display: grid;
  align-items: center;

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.4rem;
  }

  .form {
    max-width: 400px;
    border-top: 5px solid var(--lightBgColor);
    background-color: var(--lightBg);
  }

  .form-input {
    background-color: black;
    border: transparent;
    color: white;
  }

  h3 {
    text-align: center;
  }

  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }

  .btn {
    margin-top: 1rem;
    background-color: var(--backgroundColor);
  }

  .btn-demo {
    background-color: #4a9cbd;
  }

  .btn:hover {
    background-color: var(--darkBgColor);
  }

  .btn-demo:hover {
    background-color: #2b83a6;
  }

  .btn-toggle {
    background: transparent;
    border: transparent;
    color: var(--linkColor);
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
  }
`;

export default RegisterPageWrapper;
