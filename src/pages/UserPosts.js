import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import HashtagList from "../components/HashtagsList.js";
import FollowButton from "../components/FollowButton";
import {
  MainContainer,
  TimelineWrapper,
  Container,
  LoadMessage,
} from "../components/Timeline";
import { UserContext } from "../contexts/UserContext";
import checkFollow from "../helpers/checkFollow";
import { getUserById } from "../services/services";

export default function UserPosts() {
  const { user_id } = useParams();
  const { posts, message, setMessage } = useContext(UserContext);
  const [callApi, setCallApi] = useState(0);
  const [userPosts, setUserPosts] = useState([]);
  const [existingUsername, setExistingUsername] = useState("");
  const [isFollowed, setIsFollowed] = useState(null);

  useEffect(() => {
    const response = checkFollow(user_id);
    response.then((res) => {
      setIsFollowed(res);
    });
    const request = getUserById(user_id);
    request.then((res) => {
      if (res.data.length !== 0) {
        setExistingUsername(res.data[0].username);
      }
    });
    setUserPosts(
      posts.filter((post) => {
        if (Number(post.user_id) === Number(user_id)) {
          return post;
        }
        return false;
      })
    );
    if (!existingUsername) {
      setMessage("User does not exist!");
    } else if (userPosts.length === 0) {
      setMessage("User does not have posts yet!");
    }
  }, [callApi, existingUsername, user_id]);

  return (
    <>
      <Navbar></Navbar>
      <MainContainer>
        <TimelineWrapper>
          {userPosts[0] ? (
            <Title>
              <img src={userPosts[0].picture_url} alt="user" />
              {userPosts[0].owner_post} posts
              {isFollowed === "owner" ? (
                ""
              ) : (
                <FollowButton
                  isFollowed={isFollowed}
                  user_id={user_id}
                  callApi={callApi}
                  setCallApi={setCallApi}
                ></FollowButton>
              )}
            </Title>
          ) : (
            <Title>
              {existingUsername} posts
              <FollowButton
                isFollowed={isFollowed}
                user_id={user_id}
                callApi={callApi}
                setCallApi={setCallApi}
              ></FollowButton>
            </Title>
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
        <HashtagList />
      </MainContainer>
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
  position: relative;

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 8px 12px 0 0;
  }

  @media (max-width: 850px) {
    width: 100vw;
    padding-left: 17px;
    margin-bottom: 50px;
  }
`;
