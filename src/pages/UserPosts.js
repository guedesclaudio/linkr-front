import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import HashtagList from "../components/HashtagsList.js";
import {
  MainContainer,
  TimelineWrapper,
  Container,
  LoadMessage,
} from "../components/Timeline";
import { UserContext } from "../contexts/UserContext";
import listPosts from "../helpers/listPosts";
import checkFollow from "../helpers/checkFollow";
import { postFollowOrUnfollow } from "../services/services";

export default function UserPosts() {
  const { user_id } = useParams();
  let { posts, setPosts, message, setMessage, userData } =
    useContext(UserContext);
  const [isFollowed, setIsFollowed] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [callApi, setCallApi] = useState(0);

  useEffect(() => {
    const response = checkFollow(user_id);
    response.then((res) => {
      setIsFollowed(res);
    });
  }, [callApi]);

  if (posts.length === 0) {
    const res = listPosts();
    res.then((arr) => {
      setPosts(arr);
      if (posts.length === 0) {
        setMessage("User does not exist or does not have posts yet!");
      }
    });
  }
  const userPosts = posts.filter((post) => {
    if (Number(post.user_id) === Number(user_id)) {
      return post;
    }
    return false;
  });

  function followOrUnfollow() {
    setButtonDisabled(true);
    const token =
      JSON.parse(localStorage.getItem("user")).token || userData.token;
    const followed_id = user_id;
    const follow_type = isFollowed ? "unfollow" : "follow";
    try {
      postFollowOrUnfollow(token, followed_id, follow_type);
    } catch (error) {
      alert(error.message);
    }
    setCallApi(callApi + 1);
    setButtonDisabled(false);
  }

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
                  disabled={buttonDisabled}
                  isFollowed={isFollowed}
                  onClick={followOrUnfollow}
                >
                  {isFollowed ? "Unfollow" : "Follow"}
                </FollowButton>
              )}
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

const FollowButton = styled.div`
  background-color: ${(props) => (props.isFollowed ? "#FFFFFF" : "#1877f2")};
  color: ${(props) => (!props.isFollowed ? "#FFFFFF" : "#1877f2")};
  pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  border-radius: 5px;
  width: 112px;
  height: 31px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 2vh;
  cursor: pointer;

  @media (max-width: 450px) {
    left: calc((100vw - 112px) / 2);
    top: 7vh;
  }
`;
