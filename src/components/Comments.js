import styled from "styled-components";
import Comment from "./Comment.js";
import SendComment from "./SendComment.js";

export default function Comments({ commentsList, post_id, setCommentsList }) {
    return (
        <Wrapper>
            {commentsList.length > 0 ? (
                commentsList.map((comment) => (
                    <Comment 
                        key={comment.id}
                        comment_id={comment.id}
                        username={comment.username}
                        picture_url={comment.picture_url}
                        comment={comment.body}
                        user_id={comment.user_id}
                        post_id={post_id}
                    />
                ))
            )
            : ('')}
            <SendComment 
                post_id={post_id}
                setCommentsList={setCommentsList} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    min-height: 83px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    background-color: #1E1E1E;
`;