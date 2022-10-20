import styled from "styled-components";

export default function FormWrapper({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  height: 100vh;
  width: 37vw;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    position: absolute;
    top: 300px;
    @media (max-width: 460px) {
      top: 50px;
    }
  }

  input {
    width: 86%;
    height: 60px;
    background-color: #ffffff;
    border: none;
    border-radius: 6px;
    padding-left: 20px;
    font-family: "Oswald", sans-serif;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 14px;
    color: #000000;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    font-size: 26px;
    color: #9f9f9f;
  }

  button {
    width: 86%;
    height: 60px;
    background-color: #1877f2;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: "Oswald", sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: #ffffff;
    border: none;
    cursor: pointer;
  }

  p {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 20px;
    text-decoration-line: underline;
    text-underline-offset: 6px;
    margin-top: 20px;
    color: #ffffff;
    cursor: pointer;
  }

  @media (max-width: 460px) {
    width: 100vw;
    height: calc(100vh - 180px);
  }
`;
