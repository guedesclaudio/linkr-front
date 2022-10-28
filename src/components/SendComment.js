import styled from "styled-components";
import { IconContext } from "react-icons";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext.js";
import { insertComment, getComments } from "../services/services.js";

export default function SendComment({ post_id, setCommentsList }) {
    const { userData } = useContext(UserContext);
    const [comment, setComment] = useState({comment: ""});

    function handleComment (e) {
        setComment({
            [e.target.name]: e.target.value
        });
    }

    async function submitComment (e) {
        try {
            await insertComment(comment, userData.token, post_id);
            setComment({comment: ""});
            const response = await getComments(userData.token, post_id);
            setCommentsList(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Wrapper>
            <UserPhoto 
                src={
                    JSON.parse(localStorage.getItem("user")).picture_url ||
                    userData.userImage
                } />
            <SendCommentWrapper onSubmit={submitComment}>
                <Input
                    placeholder="write a comment..."
                    name="comment"
                    value={comment.comment}
                    onChange={handleComment}
                    autoComplete="off"
                    />
                <IconContext.Provider value={{ color: "white", className: "class-send-icon" }}>
                    <SendIcon>
                        <IoPaperPlaneOutline />
                    </SendIcon>
                </IconContext.Provider>
            </SendCommentWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 94%;
    margin: auto;
    display: flex;
    align-items: center;
`;
const UserPhoto = styled.img`
    width: 39px;
    height: 39px;
    border-radius: 50%;
    margin: 19px 14px 25px 0;
    cursor: pointer;
`;
const SendCommentWrapper = styled.form`
    width: 100%;
    height: 39px;
    padding: 11px;
    border-radius: 8px;
    background-color: #252525;
    display: flex;
    justify-content: space-between;
`;
const Input = styled.input`
    border: none;
    box-shadow: none;
    width: 100%;
    height: 100%;
    background-color: #252525;

    color: white;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    &::placeholder{
        font-style: italic;
        color: #575757;
    }

    &:focus{
        box-shadow: none;
        outline: none;
    }
`;
const SendIcon = styled.button`
    height: 15px;
    box-shadow: none;
    border: none;
    background-color: #252525;
    cursor: pointer;
`;