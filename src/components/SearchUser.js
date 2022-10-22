import styled from "styled-components";

export default function SearchUser({ userId, username, picture_url }) {
  return (
    <Wrapper>
      <img src={picture_url} alt="" />
      <h1> {username} </h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #e7e7e7;
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin-top: -6px;

  img {
    width: 39px !important;
    height: 39px !important;
    border-radius: 50%;
    object-fit: cover;
  }
  h1 {
    font-size: 19px;
    font-weight: 400;
    color: #515151;
    margin: 0px 10px;
  }
`;
