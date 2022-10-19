import styled from "styled-components";

export default function LogoWrapper({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  height: 100vh;
  width: 63vw;
  background-color: #151515;
  padding: 31vh 144px 0 144px;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);

  h1 {
    font-family: "Oswald", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
    max-width: 442px;
    text-align: left;
    margin-top: 12px;
  }

  @media (max-width: 460px) {
    width: 100vw;
    height: 180px;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 160px;
      height: 44px;
    }
    h1 {
      font-size: 23px;
      line-height: 34px;
      text-align: center;
      max-width: 240px;
    }
  }
`;
