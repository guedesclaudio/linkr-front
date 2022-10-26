import styled from "styled-components";
import { IconContext } from "react-icons";
import { FaTrashAlt } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import { useRef, useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { postNewBody, deletePost } from "../services/services";
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

export default function Body({ body, post_id, post_userId, setCallApi }) {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [isEditable, setIsEditable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editIsClicked, setIsClicked] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user")).user_id;
  const userToken = JSON.parse(localStorage.getItem("user")).token || userData.token;
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
      setIsEditable(false);

    } else if (e.key === "Enter") {
      setIsDisabled(true);

      try {
        const response = await postNewBody(userToken, post_id, send);
        await setCallApi(true);
        setSend(response.data);
        newBody = send.body;
        setIsEditable(false);
        setIsDisabled(false);

      } catch (error) {
        alert("Unable to save changes");
        setIsDisabled(false);
      }
    }
  }

  async function deleteThisPost() {
    setIsLoading(true);
    console.log(userToken);
    console.log(post_id);

    try {
      await deletePost(userToken, post_id);
      setIsOpen(false);
      setIsLoading(false);
      setCallApi(true);

    } catch (error) {
      setIsOpen(false);
      setIsLoading(false);
      alert("Could not delete post");
    }
  }

  return (
    <div>
      {modalIsOpen ? (
        <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false}>
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
        <Text>
          <ReactTagify
            tagStyle={tagStyle}
            tagClicked={(tag) => navigate(`/hashtag/${tag.slice(1)}`)}
          >
            { newBody }
          </ReactTagify>
        </Text>
      ) : (
        <EditableText
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

const Text = styled.h1`
  font-family: "Lato", sans-serif;
  font-size: 17px;
  font-weight: 400;
  line-height: 23px;
  color: #b7b7b7;
  margin-bottom: 6px;
`;
const EditableText = styled.input`
  width: 503px;
  min-height: 44px;
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
