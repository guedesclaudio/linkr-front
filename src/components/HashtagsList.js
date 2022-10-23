import styled from "styled-components";
import { Link } from "react-router-dom";
import { getHashtagList } from "../services/services.js";
import { useEffect, useState } from "react";

export default function HashtagsList() {
  const [hashtags, setHashtags] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const promise = getHashtagList();
      promise.then((res) => {
        setHashtags(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container>
      <span>
        <h1>trending</h1>
      </span>
      <List>
        {hashtags.map((i, index) => (
          <Link to={`/hashtag/${i.name}`} key={index}>
            <h2># {i.name}</h2>
          </Link>
        ))}
      </List>
    </Container>
  );
}

const Container = styled.div`
  display: auto;
  width: 300px;
  height: 400px;
  background-color: #171717;
  border-radius: 16px;
  margin-top: 232px;
  margin-left: 25px;

  @media (max-width: 850px) {
    display: none;
  }

  span {
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #484848;
    padding-left: 16px;

    h1 {
      font-family: "Oswald", sans-serif;
      color: #ffffff;
      font-size: 27px;
      font-weight: 700;
    }
  }
`;

const List = styled.div`
  padding-left: 16px;
  padding-top: 20px;

  h2 {
    font-size: 19px;
    font-weight: 700;
    color: #ffffff;
    font-family: "Lato", sans-serif;
    padding: 5.5px 0;
    cursor: pointer;
  }
`;
