import styled from "styled-components";
import Post from "./Post";
import { useEffect, useState, useContext } from "react";
import { getFollowedList, getPostsData } from "../services/services";
import { UserContext } from "../contexts/UserContext";
import Publish from "./Publish";
import HashtagList from "./HashtagsList.js";
import NewPostsButton from "./NewPostsButton";
import useInterval from "use-interval";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";


export default function Timeline() {
  const {
    posts,
    setPosts,
    userData,
    message,
    setMessage,
    followedPosts,
    setFollowedPosts,
    postEdition,
    page,
    setPage
  } = useContext(UserContext);

  const [callApi, setCallApi] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const userToken =
    JSON.parse(localStorage.getItem("user")).token || userData.token;
  const config = { headers: { Authorization: `Bearer ${userToken}` } };
  const userId = JSON.parse(localStorage.getItem("user")).user_id;
  let followed_list;

  const getUsersFollowed = () => {
    getFollowedList(userToken).then((res) => {
      followed_list = res.data;
    });
  };

  const getPosts = () => {
    
    getPostsData(page, config)
      .then((res) => {
        const filteredPosts = res.data.filter(
          (post) =>
            post.user_id === userId ||
            followed_list.find(
              (item) =>
                Number(item.followed_id) === Number(post.user_id) ||
                Number(item.followed_id) === Number(post.repost_user_id)
            )
        );
        setFollowedPosts(filteredPosts);
        if (res.data.length === 0) {
          setMessage("There are no posts yet");
          setHasMore(false)
        } else if (filteredPosts.length === 0 && followed_list.length === 0) {
          setMessage("You don't follow anyone yet. Search for new friends!");
        } else if (filteredPosts.length === 0 && followed_list.length !== 0) {
          setMessage("No posts found from your friends");
        } else if (filteredPosts < page * 10) {
          setHasMore(false)
        }
        setPosts(res.data);
        setPage(page + 1)
      })
      .catch((err) => {
        console.log(err);
        setMessage(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  };

  useEffect(() => {
    if (callApi) {
      getUsersFollowed();
      getPosts();
      setCallApi(false);
      console.log(followedPosts.length)
      console.log(page)
    }
  }, [callApi, postEdition]);

  function callPage() {
    setTimeout(() => setCallApi(true), 500)
  }

  return (
    <MainContainer>
      <TimelineWrapper>
        <Title>timeline</Title>
        <Publish setCallApi={setCallApi}></Publish>
        <NewPostsButton setCallApi={setCallApi}></NewPostsButton>
        <Container>
        <InfiniteScroll
            dataLength={followedPosts.length}
            next={callPage}
            hasMore={hasMore}
            loader={ followedPosts.length < (page - 1) * 10 ? 
              <ScrollMessage>
                  <p>You don't have any more posts</p>
               </ScrollMessage> :
               <ScrollMessage>
                  <p>Loading more posts...</p>
                  <ReactLoading type="spin" color="#fff" width={30}/>
               </ScrollMessage>}
            endMessage={!hasMore ? <h1>Yay! You have seen it all</h1> : ""}
          >
          {followedPosts.length > 0 ? (
            followedPosts.map((value, index) => (
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
                repostsCount={value.repostsCount}
                repost_id={value.repost_id}
                repost_user_id={value.repost_user_id}
                reposted_by={value.reposted_by}
                callApi={callApi}
                setCallApi={setCallApi}
                getPosts={getPosts}
              />
            ))
          ) : (
            <LoadMessage>{message}</LoadMessage>
          )}
          </InfiniteScroll>
        </Container>
      </TimelineWrapper>
      <HashtagList />
    </MainContainer>
  );
}
const ScrollMessage = styled.div`
  text-align: center; 
  width: 240px;
  margin: 40px auto;
  display: flex;
  justify-content: center;
  align-items: center;  
  flex-direction: column;

  && p {
    font-family: 'Lato';
    font-weight: 400;
    font-size: 22px;
    color: #6D6D6D;
    margin-bottom: 16px;
  }
`
const MainContainer = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TimelineWrapper = styled.div`
  margin-top: 125px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 850px) {
    margin-top: 40px;
  }
`;

const Title = styled.div`
  width: 611px;
  margin-bottom: 43px;
  font-family: "Oswald", sans-serif;
  font-size: 43px;
  font-weight: 700;
  line-height: 63.73px;
  color: white;
  text-align: start;

  @media (max-width: 850px) {
    width: 100vw;
    padding-left: 17px;
  }
`;

const Container = styled.div`
  width: 611px;
  margin: 0px auto;

  @media (max-width: 850px) {
    width: 100vw;
  }
`;

const LoadMessage = styled.div`
  width: 200px;
  margin: 0px auto;
  color: white;
  font-family: "Lato", sans-serif;
  font-size: 19px;
  font-weight: 400;
  text-align: center;
`;

export { MainContainer, TimelineWrapper, Title, Container, LoadMessage };
