import styled from "styled-components";

const PostBox = styled.div`
    width: 611px;
    min-height: ${props => props.isPublish ? '209px' : '276px'};
    padding: 20px;
    background-color: ${props => props.isPublish ? 'white' : '#171717'};

    border-radius: 16px;
    margin-bottom: ${props => props.isPublish ? '29px' : '20px'};
    display: flex;
    justify-content: space-between;
    align-items: top;

    @media (max-width: 650px) {
        width: 100vw;
        min-height: ${props => props.isPublish ? '164px' : '232px'};
        border-radius: 0;
    }
`;

const UserImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;

    @media (max-width: 650px) {
        display: ${props => props.isPublish ? 'none' : 'flex'};
    }
`;

export { PostBox, UserImage };