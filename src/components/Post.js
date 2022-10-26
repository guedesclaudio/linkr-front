import styled from "styled-components";
import PostContents from "./PostContents.js";
import ReactTooltip from "react-tooltip";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { BiRepost } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useEffect, useState, useContext } from "react";
import { sendLikeOrDeslike, postRepost } from "../services/services";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Post({
  post_userId,
  username,
  picture_url,
  postId,
  body,
  post_url,
  metadata,
  liked,
  likesCount,
  callApi,
  setCallApi,
  messageToolTip,
  getPosts,
}) {
  const [like, setLike] = useState(liked);
  const heartColor = like ? "red" : "white";
  const likesIsOne = likesCount === "1" ? "1 like" : ` ${likesCount} likes`;
  const { userData } = useContext(UserContext);
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  const navigate = useNavigate();

  useEffect(() => {
    setLike(liked);
  }, [liked]);

  async function likeOrDeslike(value) {
    if (value) {
      setLike(true);
      try {
        await sendLikeOrDeslike({ postId, likeValue: true, config });
      } catch (error) {
        console.error(error, "Unable to communicate");
      }

      getPosts();
      setCallApi(true);
      return;
    }
    setLike(false);
    try {
      sendLikeOrDeslike({ postId, likeValue: false, config });
    } catch (error) {
      console.error(error, "Unable to communicate");
    }
    setCallApi(true);
    getPosts();
  }

  function repost() {
    alert("Deseja mesmo repostar?");
    try {
      postRepost({ config, postId });
    } catch (error) {
      console.error(error, "Unable to communicate");
    }
  }

  return (
    <PostBox>
      <UserAndLikes>
        <UserImage
          onClick={() => navigate(`/users/${post_userId}`)}
          src={picture_url}
        />
        <IconContext.Provider
          value={{ color: `${heartColor}`, className: "class-like" }}
        >
          <Likes>
            {like ? (
              <IoIosHeart onClick={() => likeOrDeslike(false)} />
            ) : (
              <IoIosHeartEmpty onClick={() => likeOrDeslike(true)} />
            )}
            <LikesCount data-tip data-for={messageToolTip}>
              {!likesCount ? "0 likes" : likesIsOne}
            </LikesCount>
          </Likes>
          <CommentCount>
            <AiOutlineComment color={"white"} />
            <Count>0 comments</Count>
          </CommentCount>
          <RepostCount>
            <BiRepost color={"white"} onClick={repost} />
            <Count>0 re-posts</Count>
          </RepostCount>
        </IconContext.Provider>
        <ReactTooltip
          id={messageToolTip}
          place="bottom"
          effect="float"
          type="light"
        >
          <Message>{messageToolTip}</Message>
        </ReactTooltip>
      </UserAndLikes>
      <PostContents
        username={username}
        body={body}
        post_url={post_url}
        metadata={metadata}
        post_id={postId}
        post_userId={post_userId}
        callApi={callApi}
        setCallApi={setCallApi}
      />
    </PostBox>
  );
}

const PostBox = styled.div`
  width: 611px;
  min-height: 276px;
  background-color: #171717;
  border-radius: 16px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: top;

  @media (max-width: 850px) {
    width: 100vw;
    min-height: 232px;
    border-radius: 0;
  }
`;
const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  margin: 20px 20px 0 20px;
  cursor: pointer;
`;
const UserAndLikes = styled.div`
  display: flex;
  justify-content: top;
  align-items: center;
  flex-direction: column;

  && .class-like {
    margin: 18px 0 5px 0;
    color: ${(props) => props.color};
    font-size: 20px;
    cursor: pointer;
  }
`;
const Likes = styled(UserAndLikes)``;
const LikesCount = styled.p`
  font-family: "Lato", sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 13px;
  color: #ffffff;
  cursor: pointer;
`;
const Message = styled(LikesCount)`
  color: #505050;
  font-weight: 700;
`;
const CommentCount = styled.div`
  display: flex;
  justify-content: top;
  align-items: center;
  flex-direction: column;
`;
const RepostCount = styled(CommentCount)`
  margin-bottom: 20px;
  color: white;
`;
const Count = styled(LikesCount)``;
