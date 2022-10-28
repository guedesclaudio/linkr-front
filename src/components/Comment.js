import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getIfIsPostsAuthor } from "../services/services";
import { UserContext } from "../contexts/UserContext.js";

export default function Comment({
    comment_id,
    username,
    picture_url,
    comment,
    user_id,
    post_id
}) {
    const { userData } = useContext(UserContext);
    const [authorLabel, setAuthorLabel] = useState('');

    async function getLabel() {
        const response = await getIfIsPostsAuthor(userData.token, post_id, user_id, comment_id);
        
        if (response.data.isThePostsAuthor) {
            return setAuthorLabel("post's author");
        }

        if (response.data.isFollowing) {
            return setAuthorLabel("following");
        }
    }
    getLabel();

    return (
        <Wrapper>
            <Contents>
                <UserImage src={picture_url} />
                <CommentContent>
                    <UserInfo>
                        <UserName>{username}</UserName>
                        <Circle />
                        <Label>{authorLabel}</Label>
                    </UserInfo>
                    <Text>{comment}</Text>
                </CommentContent>
            </Contents>
            <Line />
        </Wrapper>
    );
}

const Wrapper = styled.div`

`;
const Contents = styled.div`
    width: 94%;
    min-height: 72px;
    display: flex;
    align-items: center;
    margin: auto;
`;
const UserImage = styled.img`
    width: 39px;
    height: 39px;
    border-radius: 50%;
    margin-right: 14px;
    cursor: pointer;
`;
const CommentContent = styled.div`

`;
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
`;
const UserName = styled.div`
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #F3F3F3;
`;
const Circle = styled.div`
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #565656;
    margin-left: 6px;
`;
const Label = styled.div`
    margin-left: 6px;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #565656;
`;
const Text = styled.div`
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ACACAC;
`;
const Line = styled.div`
    width: 94%;
    height: 0;
    border-bottom: 1px solid #353535;
    margin: auto;
`;