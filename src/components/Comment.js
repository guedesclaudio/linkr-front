import styled from "styled-components";
import { IconContext } from "react-icons";
import { FaTrashAlt } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import { useRef, useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { postNewBody, deletePost, getPostsData } from "../services/services";
import Modal from "react-modal";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",

    width: "597px",
    height: "262px",
    borderRadius: "50px",
    background: "#333333",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    zIndex: 3,
  },
};

export default function Comment({
  body,
  post_id,
  post_userId,
  callApi,
  setCallApi,
}) {
  const navigate = useNavigate();
  const { userData, setMessage, setPosts } = useContext(UserContext);
  const [isEditable, setIsEditable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editIsClicked, setIsClicked] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user")).user_id;
  const userToken =
    JSON.parse(localStorage.getItem("user")).token || userData.token;
  const [send, setSend] = useState({ body });
  let newBody = body;

  const inputRef = useRef();

  useEffect(() => {
    if (editIsClicked) {
      inputRef.current.focus();
    }
  }, [editIsClicked]);

  function handleForm(e) {
    setSend({
      ...send,
      [e.target.name]: e.target.value,
    });
  }

  async function submitChanges(e) {
    if (e.key === "Escape") {
      setSend({ body: newBody });
      setIsPublish(false);
      setIsEditable(false);
    } else if (e.key === "Enter") {
      setIsDisabled(true);

      try {
        const response = await postNewBody(userToken, post_id, send);
        setSend(response.data);
        newBody = response.data.body;
        setIsPublish(true);
        setIsEditable(false);
        setIsDisabled(false);
        setTimeout(() => setCallApi(callApi + 1), 250);
      } catch (error) {
        alert("Unable to save changes");
        setIsDisabled(false);
      }
    }
  }

  async function deleteThisPost() {
    setIsLoading(true);

    try {
      await deletePost(userToken, post_id);
      setIsOpen(false);
      setIsLoading(false);

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      try {
        const response = await getPostsData(config);

        if (response.data.length === 0) {
          setMessage("There are no posts yet");
        }
        setPosts(response.data);
      } catch (error) {
        setMessage(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
        console.log(error);
      }
    } catch (error) {
      setIsOpen(false);
      setIsLoading(false);
      alert("Could not delete post");
    }
  }

  return (
    <div>
      {modalIsOpen ? (
        <Modal isOpen={modalIsOpen} style={customStyles}>
          {isLoading ? (
            <ReactLoading
              type="balls"
              color="#ffffff"
              width="64px"
              height="64px"
            />
          ) : (
            <>
              <ModalTitle>
                Are you sure you want to delete this post?
              </ModalTitle>
              <ModalButtons>
                <Cancel onClick={() => setIsOpen(false)}>No, go back</Cancel>
                <Submit onClick={deleteThisPost}>Yes, delete it</Submit>
              </ModalButtons>
            </>
          )}
        </Modal>
      ) : (
        ""
      )}

      {userId === post_userId ? (
        <IconContext.Provider
          value={{ color: "white", className: "class-modification-icons" }}
        >
          <ModificationIcons>
            <BsFillPencilFill
              onClick={() => {
                setIsClicked(!editIsClicked);
                setIsPublish(false);
                setSend({ body: newBody });
                setIsEditable(!isEditable);
              }}
            />
            <FaTrashAlt onClick={() => setIsOpen(true)} />
          </ModificationIcons>
        </IconContext.Provider>
      ) : (
        ""
      )}

      {!isEditable ? (
        <Body>
          <ReactTagify
            tagStyle={tagStyle}
            tagClicked={(tag) =>
              navigate(`/hashtag/${tag.slice(1).toLowerCase()}`)
            }
          >
            {isPublish ? send.body : newBody}
          </ReactTagify>
        </Body>
      ) : (
        <EditableBody
          name="body"
          type="text"
          value={send.body}
          onChange={handleForm}
          disabled={isDisabled}
          ref={inputRef}
          onKeyDown={submitChanges}
        />
      )}
    </div>
  );
}

const tagStyle = {
  color: "#FFFFFF",
  margin: "0px 2px",
  cursor: "pointer",
};

const Body = styled.h1`
  font-family: "Lato", sans-serif;
  font-size: 17px;
  font-weight: 400;
  line-height: 23px;
  color: #b7b7b7;
  margin-bottom: 6px;
`;
const EditableBody = styled.textarea`
  width: 503px;
  min-height: 44px;
  height: 100px;
  resize: horizontal;
  word-break: break-word;
  padding: 5px 20px;
  border-radius: 7px;
  background-color: white;
  border: none;
  box-shadow: none;
  font-family: "Lato", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  color: #4c4c4c;

  @media (max-width: 850px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const ModificationIcons = styled.div`
  width: 46px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  right: 0;
`;
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
