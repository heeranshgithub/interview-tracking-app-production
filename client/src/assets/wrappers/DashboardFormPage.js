import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--lightBg);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    background: var(--lightBg);
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    background: var(--lightBg);
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }

  .form-input {
    border-color: var(--darkBg);
    background-color: var(--darkBg);
    color: white;
  }

  .form-select {
    height: auto;
    background-color: var(--darkBg);
    color: white;
    border: transparent;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;

    button {
      height: 35px;
      margin-bottom: 0.2rem;
    }
  }
  .clear-btn {
    background: #c2301d;
  }
  .clear-btn:hover {
    background: #a12b1b;
  }

  .date-picker{
    background-color: black;
    color: white;
    border: 2px solid black;
    border-radius: 5px;
    padding: 7px 0;
    padding-left: 8px;
    width: 100%;
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default Wrapper;
