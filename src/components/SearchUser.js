import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import checkFollow from "../helpers/checkFollow";

export default function SearchUser({
  userId,
  username,
  picture_url,
  setSearch,
}) {
  const navigate = useNavigate();
  const [isFollowed, setIsFollowed] = useState(null);

  useEffect(() => {
    const response = checkFollow(userId);
    response.then((res) => {
      setIsFollowed(res);
    });
  }, []);

  return (
    <Wrapper>
      <img
        onClick={() => {
          setSearch("");
          navigate(`/users/${userId}`);
        }}
        src={picture_url}
        alt=""
      />
      <h1
        onClick={() => {
          setSearch("");
          navigate(`/users/${userId}`);
        }}
      >
        {" "}
        {username}{" "}
      </h1>
      {isFollowed === "following" ? <Following>• following</Following> : ""}
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
    cursor: pointer;
  }
  h1 {
    font-size: 19px;
    font-weight: 400;
    color: #515151;
    margin: 0px 10px;
    cursor: pointer;
    font-family: "Lato";
  }
`;

const Following = styled.span`
  font-family: "Lato";
  color: #c5c5c5;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
`;
