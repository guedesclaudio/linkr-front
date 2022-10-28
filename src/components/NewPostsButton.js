import { useContext, useState } from "react";
import styled from "styled-components";
import useInterval from "use-interval";
import { UserContext } from "../contexts/UserContext";
import { getFollowedList, getPostsData } from "../services/services";

export default function NewPostsButton({ setCallApi }) {
  const { userData, followedPosts } = useContext(UserContext);
  const [newFollowedPosts, setNewFollowedPosts] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const userToken =
    JSON.parse(localStorage.getItem("user")).token || userData.token;
  const config = { headers: { Authorization: `Bearer ${userToken}` } };
  const userId =
    JSON.parse(localStorage.getItem("user")).user_id || userData.userId;

  let followed_list;
  const getUsersFollowed = () => {
    getFollowedList(userToken).then((res) => {
      followed_list = res.data;
    });
  };

  const getPosts = () => {
    getUsersFollowed();
    getPostsData(config).then((res) => {
      const filteredPosts = res.data.filter(
        (post) =>
          post.user_id === userId ||
          followed_list.find(
            (item) =>
              Number(item.followed_id) === Number(post.user_id) ||
              Number(item.followed_id) === Number(post.repost_user_id)
          )
      );
      setNewFollowedPosts(filteredPosts);
    });
  };

  useInterval(() => {
    setButtonDisabled(false);
    getPosts();
  }, 15 * 1000);

  return newFollowedPosts.length - followedPosts.length > 0 ? (
    <Wrapper
      buttonDisabled={buttonDisabled}
      onClick={() => {
        setButtonDisabled(true);
        setCallApi(true);
      }}
    >
      <p>
        {newFollowedPosts.length - followedPosts.length} new posts, load more!
      </p>
    </Wrapper>
  ) : (
    ""
  );
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  background-color: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  width: 100%;
  height: 62px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: ${(props) => (props.buttonDisabled ? "none" : "inherit")};
  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 19px;
    color: #ffffff;
  }
`;
