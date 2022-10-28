import styled from "styled-components";
import Comment from "./Comment.js";
import SendComment from "./SendComment.js";

export default function Comments({ post_id }) {
    const commentsPost = [
        {
            user_image: "",
            username: "João Avatares",
            comment: "Adorei esse post, ajuda muito a usar Material UI com React!",
            following: true,
            isTheAuthor: false
        }
    ];

    return (
        <Wrapper>
            {/* {commentsPost.length > 0 ? (
                commentsPost.map((comment, index) => (
                    <Comment 
                        key={index}
                        username={comment.username}
                        user_image={comment.user_image}
                        following={comment.following}
                        isTheAuthor={comment.isTheAuthor}
                        comment={comment.comment}
                    />
                ))
            )
            : ('')} */}
            <SendComment post_id={post_id} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    min-height: 83px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    background-color: #1E1E1E;
    position: absolute;
`;