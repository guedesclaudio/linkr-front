import styled from "styled-components";
import PostContents from "./PostContents.js";
import Comments from "./Comments.js";
import ReactTooltip from "react-tooltip";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { BiRepost } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useEffect, useState, useContext } from "react";
import { sendLikeOrDeslike, postRepost } from "../services/services";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { customStyles } from "../styles/customStyles.js";

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
  repostsCount,
  repost_id,
  repost_user_id,
  reposted_by,
  callApi,
  setCallApi,
  messageToolTip,
  getPosts,
}) {
  const [like, setLike] = useState(liked);
  const heartColor = like ? "red" : "white";
  const { userData, postEdition, setPostEdition } = useContext(UserContext);
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  const userId = JSON.parse(localStorage.getItem("user")).user_id;
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const msgToolTipId = repost_user_id ? `${repost_id}` : `${postId}`;

  useEffect(() => {
    setLike(liked);
  }, [liked]);

  async function likeOrDeslike(value) {
    if (reposted_by) {
      alert("Não é possível curtir um re-post");
      return;
    }
    if (value) {
      setLike(true);
      try {
        await sendLikeOrDeslike({ postId, likeValue: true, config });
      } catch (error) {
        console.error(error, "Unable to communicate");
      }

      getPosts();
      setCallApi(true);
      setPostEdition(!postEdition);
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
    setPostEdition(!postEdition);
  }

  function openModalRepost() {
    if (reposted_by) {
      alert("Não é possível re-postar um re-post");
      return;
    }

    if (userId === post_userId) {
      alert("Não é possível re-postar o próprio post");
      return;
    }
    setModalIsOpen(true);
  }

  async function repost() {
    try {
      await postRepost({ config, postId });
      getPosts();
      setCallApi(true);
    } catch (error) {
      console.error(error);
      alert("Algo deu errado!");
    }
    setModalIsOpen(false);
  }

  function goUserPage() {
    localStorage.setItem(
      "userPage",
      JSON.stringify({
        name: username,
        userId: post_userId,
        userImage: picture_url,
      })
    );
    navigate(`/users/${post_userId}`);
  }

  return (
    <Box>
      {repost_user_id ? (
        <RepostBox>
          <BiRepost className={"icon"} />
          <RepostMessage>
            {userId === repost_user_id
              ? "Re-posted by you"
              : `Re-posted by ${reposted_by}`}
          </RepostMessage>
        </RepostBox>
      ) : (
        ""
      )}
      <PostBox margin={repost_user_id ? "40px" : "0px"}>
        <UserAndLikes>
          <UserImage onClick={goUserPage} src={picture_url} />
          <IconContext.Provider
            value={{ color: `${heartColor}`, className: "class-like" }}
          >
            <Likes>
              {like ? (
                <IoIosHeart onClick={() => likeOrDeslike(false)} />
              ) : (
                <IoIosHeartEmpty onClick={() => likeOrDeslike(true)} />
              )}
              <LikesCount data-tip data-for={msgToolTipId}>
                {likesCount} {likesCount === 1 ? "like" : "likes"}
              </LikesCount>
            </Likes>
            <CommentCount>
              <AiOutlineComment color={"white"} />
              <Count>0 comments</Count>
            </CommentCount>
            <RepostCount>
              <BiRepost color={"white"} onClick={openModalRepost} />
              <Count>
                {repostsCount} {repostsCount === 1 ? "re-post" : "re-posts"}
              </Count>
            </RepostCount>
          </IconContext.Provider>
          <ReactTooltip
            id={msgToolTipId}
            place="bottom"
            effect="float"
            type="light"
          >
            <Message>{messageToolTip}</Message>
          </ReactTooltip>
        </UserAndLikes>
        <PostContents
          username={username}
          picture_url={picture_url}
          body={body}
          post_url={post_url}
          metadata={metadata}
          post_id={postId}
          post_userId={post_userId}
          callApi={callApi}
          setCallApi={setCallApi}
        />
        <Comments />
        {modalIsOpen ? (
          <Modal isOpen={modalIsOpen} style={customStyles}>
            <ModalTitle>Do you want to re-post this link?</ModalTitle>
            <ModalButtons>
              <Cancel onClick={() => setModalIsOpen(false)}>No, go back</Cancel>
              <Submit onClick={repost}>Yes, share!</Submit>
            </ModalButtons>
          </Modal>
        ) : (
          ""
        )}
      </PostBox>
    </Box>
  );
}

const Box = styled.div`
  border: 1px solid #333333;
  position: relative;
  width: 611px;

  @media (max-width: 850px) {
    width: 100vw;
    min-height: 232px;
  }
`;
const RepostBox = styled.div`
  background-color: #1e1e1e;
  border-radius: 16px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  display: flex;
  justify-content: left;
  align-items: top;
  padding: 10px 0 0 20px;

  && .icon {
    margin-top: -4px;
    color: white;
    font-size: 22px;
  }
`;
const RepostMessage = styled.p`
  font-family: "Lato";
  font-weight: 400;
  font-size: 11px;
  color: #ffffff;
  margin-left: 10px;
`;
const PostBox = styled.div`
  margin-top: ${(props) => props.margin};
  width: 100%;
  min-height: 276px;
  background-color: #171717;
  border-radius: 16px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: top;

  @media (max-width: 850px) {
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

///////////// compartilhar
const ModalTitle = styled.div`
  width: 345px;
  font-family: "Lato", sans-serif;
  font-size: 34px;
  font-weight: 700;
  line-height: 40.8px;
  color: white;
  margin-bottom: 40px;
  text-align: center;
`;
const ModalButtons = styled.div`
  width: 295px;
  height: 38px;
  display: flex;
  justify-content: space-between;
`;
const Cancel = styled.button`
  width: 134px;
  height: 37px;
  border-radius: 5px;
  background-color: white;

  font-family: "Lato", sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 21.6px;
  color: #1877f2;

  box-shadow: none;
  border: none;
  cursor: pointer;
`;
const Submit = styled(Cancel)`
  background-color: #1877f2;
  color: white;
`;
