import styled from "styled-components";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import {
  TimelineWrapper,
  Container,
  LoadMessage,
} from "../components/Timeline";
import { UserContext } from "../contexts/UserContext";
import { getPostsData } from "../services/services";

export default function UserPosts() {
  const { user_id } = useParams();
  let { posts, setPosts, userData, message, setMessage } =
    useContext(UserContext);

  const userToken =
    JSON.parse(localStorage.getItem("user")).token || userData.token;
  const config = { headers: { Authorization: `Bearer ${userToken}` } };
  async function getPosts() {
    const response = await getPostsData(config);
    setPosts(response.data);
  }
  if (posts.length === 0) {
    getPosts();
  }
  console.log(posts);
  const userPosts = posts.filter((post) => {
    if (Number(post.user_id) === Number(user_id)) return post;
    return false;
  });
  if (userPosts.length === 0) {
    setMessage("User does not exist or does not have posts yet!");
  }
  const [callApi, setCallApi] = useState(true);

  return (
    <>
      <Navbar></Navbar>
      <TimelineWrapper>
        {userPosts[0] ? (
          <Title>
            <img src={userPosts[0].picture_url} alt="user" />
            {userPosts[0].owner_post} posts
          </Title>
        ) : (
          ""
        )}

        <Container>
          {userPosts.length > 0 ? (
            userPosts.map((value, index) => (
              <Post
                key={index}
                post_userId={value.user_id}
                username={value.owner_post}
                picture_url={value.picture_url}
                postId={value.post_id}
                body={value.body}
                post_url={value.post_url}
                metadata={value.metadata}
                liked={value.liked}
                likesCount={value.likesCount}
                messageToolTip={value.messageToolTip}
                callApi={callApi}
                setCallApi={setCallApi}
              />
            ))
          ) : (
            <LoadMessage>{message}</LoadMessage>
          )}
        </Container>
      </TimelineWrapper>
    </>
  );
}

const Title = styled.div`
  width: 611px;
  margin-bottom: 43px;
  font-family: "Oswald", sans-serif;
  font-size: 43px;
  font-weight: 700;
  line-height: 63.73px;
  color: white;
  text-align: start;
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 8px 12px 0 0;
  }

  @media (max-width: 650px) {
    width: 100vw;
    padding-left: 17px;
  }
`;
