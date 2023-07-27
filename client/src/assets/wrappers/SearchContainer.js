import styled from 'styled-components';

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
    background: var(--lightBg);
  }

  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
    background-color: var(--darkBg);
    color: white;
  }

  .form-select {
    height: auto;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
    background: #c2301d;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
      background: #c2301d;
    }
    .btn-block:hover {
      background: #a12b1b;
    }
  }
`;

export default Wrapper;
