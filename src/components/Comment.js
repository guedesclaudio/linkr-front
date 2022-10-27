import styled from "styled-components";

export default function Comment({
    username,
    user_image,
    following,
    isTheAuthor,
    comment
}) {
    return (
        <Wrapper>
            <Contents>
                <UserImage />
                <CommentContent>
                    <UserInfo>
                        <UserName></UserName>
                        <Circle />
                        <Label></Label>
                    </UserInfo>
                    <Text></Text>
                </CommentContent>
            </Contents>
            <Line />
        </Wrapper>
    );
}

const Wrapper = styled.div`

`;
const Contents = styled.div`
    width: 93%;
    min-height: 72px;
`;
const UserImage = styled.img`

`;
const CommentContent = styled.div`

`;
const UserInfo = styled.div`

`;
const UserName = styled.div`

`;
const Circle = styled.div`

`;
const Label = styled.div`

`;
const Text = styled.div`

`;
const Line = styled.div`

`;