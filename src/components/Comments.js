import styled from "styled-components";
import Comment from "./Comment.js";

export default function Comments() {
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
            {commentsPost.length > 0 ? (
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
            : ('')}
        </Wrapper>
    )
}

const Wrapper = styled.div`

`;