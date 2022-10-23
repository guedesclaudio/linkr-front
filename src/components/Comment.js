import styled from "styled-components";
import { IconContext } from "react-icons";
import { FaTrashAlt } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import { useRef, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { postNewBody, deletePost, getPostsData } from "../services/services";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

        width: '597px',
        height: '262px',
        borderRadius: '50px',
        background: '#333333',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        zIndex: 3,
    },
};

export default function Comment ({ body, post_id, post_userId }) {
    const { userId, userData, setMessage, setPosts } = useContext(UserContext);
    const [isEditable, setIsEditable] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isPublish, setIsPublish] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);

    const [send, setSend] = useState({
        body
    });

    const inputRef = useRef();
    console.log(inputRef);

    function getFocusInput () {
        inputRef.current.focus();
    }

    function handleForm (e) {
        setSend({
            ...send,
            [e.target.name]: e.target.value
        });
    }

    async function submitChanges (e) {
        if (e.key === "Escape") {
            setSend({
                body
            });
            setIsEditable(false);

        } else if (e.key === "Enter") {            
            setIsDisabled(true);
            
            try {
                await postNewBody(userData.token, post_id, send);
                setIsEditable(false);
                setIsDisabled(false);
                setIsPublish(true);

            } catch (error) {
                alert("Unable to save changes");
                setIsDisabled(false);
            }
            
        }
    }

    async function deleteThisPost () {
        try {
            await deletePost(userData.token, post_id);
            setIsOpen(false);

            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }};

            try {
                const response = await getPostsData(config);
                
                if (response.data.length === 0) {
                    setMessage("There are no posts yet");
                }
                setPosts(response.data);
                
            } catch (error) {
                setMessage("An error occured while trying to fetch the posts, please refresh the page");
                console.log(error);
            }

        } catch (error) {
            setIsOpen(false);
            alert("Could not delete post");
        }
    }

    return (
        <div>
            {modalIsOpen ?
            <Modal 
                isOpen={modalIsOpen}
                style={customStyles}>
                <ModalTitle>Are you sure you want to delete this post?</ModalTitle>
                <ModalButtons>
                    <Cancel onClick={() => setIsOpen(false)}>No, go back</Cancel>
                    <Submit onClick={deleteThisPost}>Yes, delete it</Submit>
                </ModalButtons>
            </Modal>
            : ''
            }

            {userId === post_userId ? 
            <IconContext.Provider value={{ color: "white", className: "class-modification-icons" }}>
                <ModificationIcons>
                    <BsFillPencilFill
                        onClick={() => {
                            setIsPublish(false);
                            setIsEditable(!isEditable);
                            getFocusInput();
                        }} />
                    <FaTrashAlt 
                        onClick={() => setIsOpen(true)}
                    />
                </ModificationIcons>
            </IconContext.Provider>
            : ''}

            {!isEditable
            ? <Body>{isPublish ? send.body : body}</Body>
            : <EditableBody 
                name='body'
                type='text'
                value={send.body}
                onChange={handleForm}
                disabled={isDisabled}
                ref={inputRef}
                onKeyDown={submitChanges}
                />}
        </div>
    );
}

const Body = styled.h1`
    font-family: 'Lato', sans-serif;
    font-size: 17px;
    font-weight: 400;
    line-height: 23px;
    color: #B7B7B7;
    margin-bottom: 6px;
`;
const EditableBody = styled.input`
    width: 503px;
    min-height: 44px;
    padding: 5px 20px;
    border-radius: 7px;
    background-color: white;
    border: none;
    box-shadow: none;

    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    color: #4C4C4C;
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
    font-family: 'Lato', sans-serif;
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

    font-family: 'Lato', sans-serif;
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