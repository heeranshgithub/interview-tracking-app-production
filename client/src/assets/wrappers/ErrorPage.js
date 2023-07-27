import styled from 'styled-components';

const ErrorPageWrapper = styled.div`
  .container {
    margin: 0 auto;
  }

  .top {
    display: flex;
    justify-content: center;
    margin-top: 225px;
  }

  .img {
    display: block;
    margin-bottom: 50px;
    width: 350px;
  }

  h3 {
    text-align: center;
    display: block;
    margin-bottom: 0;
  }

  p {
    margin: 0 auto;
    text-align: center;
  }

  .linkDiv {
    text-align: center;
  }

  .link {
    color: white;
    text-decoration: underline;
  }
`;


export default ErrorPageWrapper;