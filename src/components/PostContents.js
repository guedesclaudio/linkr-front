import styled from "styled-components";
import { IconContext } from "react-icons";
import { FaTrashAlt } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import { useRef, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { postNewBody } from "../services/services";

export default function PostContents({
    username,
    body,
    post_url,
    metadata,
    post_id,
    post_userId
}) {
    const { userId, userData } = useContext(UserContext);
    const [isEditable, setIsEditable] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [send, setSend] = useState({
        body
    });
    const inputRef = useRef(null);
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
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                    postId: post_id
                }};
            
            setIsDisabled(true);
            
            try {
                await postNewBody(config, send);
                setIsEditable(false);
                setIsDisabled(false);

            } catch (error) {
                alert("Unable to save changes");
                setIsDisabled(false);
            }
            

        }
    }

    function deletePost () {

    }

    return (
        <Contents>
            <UserName>{username}</UserName>

            {
                userId === post_userId ? 
                <IconContext.Provider value={{ color: "white", className: "class-modification-icons" }}>
                    <ModificationIcons>
                        <BsFillPencilFill
                            onClick={() => {
                                setIsEditable(!isEditable);
                                // getFocusInput()
                            }} />
                        <FaTrashAlt 
                            onClick={deletePost}
                        />
                    </ModificationIcons>
                </IconContext.Provider>
                : ''
            }
            {
                !isEditable
                ? <Body>{send.body}</Body>
                : <EditableBody 
                    name='body'
                    type='text'
                    value={send.body}
                    onChange={handleForm}
                    disabled={isDisabled}
                    ref={inputRef}
                    onKeyDown={submitChanges}
                    />
            }
            
            <a href = {post_url} target = "_blank">
                <Link>
                    <LinkContents>
                        <Title>{metadata.title}</Title>
                        <Description>{metadata.description}</Description>
                        <Url>{post_url}</Url>
                    </LinkContents>
                    <LinkImage src = {metadata.image}/>
                </Link>
            </a>
        </Contents>
    )
}

const Contents = styled.div`
    margin-top: 20px;
    margin-right: 20px;
    margin-bottom: 20px;;
    width: 82%;
    min-height: 180px;
    box-sizing: border-box;

    position: relative;
`;
const UserName = styled.h1`
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    font-weight: 400;
    line-height: 23px;
    color: #FFFFFF;
    margin-bottom: 6px;
`;
const ModificationIcons = styled.div`
    width: 46px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    right: 0;
`;
const Body = styled(UserName)`
    font-size: 17px;
    color: #B7B7B7;
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
const Link = styled.div`
    box-sizing: border-box;
    width: 503px;
    min-height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: top;
    cursor: pointer;

    @media (max-width: 650px) {
        width: 100%;
        min-height: 115px;
    }
`;
const LinkContents = styled.div`
    margin-left: 20px;
    margin-top: 20px;

    @media (max-width: 650px) {
        margin-left: 10px;
    }
`;
const Title = styled.h1`
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: left;
    color: #CECECE;
    margin-bottom: 10px;

    @media (max-width: 650px) {
        font-size: 10px;
    }
`;
const Description = styled(Title)`
    color: #9B9595;
    font-size: 11px;
    line-height: 13px;

    @media (max-width: 650px) {
        font-size: 8px;
        line-height: 10px;
    }
`;
const Url = styled(Description)`
    color: #CECECE;
`;
const LinkImage = styled.img`
    width: 153.44px;
    min-height: 153px;
    border-radius: 0px 12px 13px 0px;

    @media (max-width: 650px) {
        width: 30%;
        min-height: 113px;
    }
`;