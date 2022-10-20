import styled from "styled-components"
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { IconContext } from "react-icons";
import { useState } from "react";

export default function Post({
    username,
    picture_url,
    body,
    post_url,
    metadata
}) {

    const [like, setLike] = useState(false)

    function likeOrDeslike(value) {
        value ? setLike(true) : setLike(false)
    }

    return (
        <PostBox>
            <UserAndLikes>
                <UserImage src = {picture_url}/>
                <IconContext.Provider value={{className: "global-class-name" }}>
                    <Likes>
                        {like ? 
                        <IoIosHeart onClick = {() => likeOrDeslike(false)}/> :
                        <IoIosHeartEmpty onClick = {()=> likeOrDeslike(true)}/>}
                        <LikesCount>13 likes</LikesCount>
                    </Likes>
                </IconContext.Provider>
            </UserAndLikes>
            <Contents>
                <UserName>{username}</UserName>
                <Body>{body}</Body>
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
        </PostBox>
    )
}

const PostBox = styled.div`
    width: 611px;
    min-height: 276px;
    background-color: #171717;
    border-radius: 16px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: top;

    @media (max-width: 650px) {
        width: 100vw;
        min-height: 232px;
    }
`
const UserImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin: 20px 20px 0 20px;
`
const UserAndLikes = styled.div`
    display: flex;
    justify-content: top;
    align-items: center;
    flex-direction: column;
    
    && .global-class-name {
        margin: 30px 0 15px 0;
        color: white;
        font-size: 20px;
        cursor: pointer;
    }
`
const Likes = styled(UserAndLikes)`
    min-height: 80px;
`
const LikesCount = styled.p`
    font-family: Arial, Helvetica, sans-serif; //trocar pra Lato
    font-size: 13px;
    font-weight: 400;
    line-height: 13px;
    color: #FFFFFF;
`
const Contents = styled.div`
    margin-top: 20px;
    margin-right: 20px;
    margin-bottom: 20px;;
    width: 82%;
    min-height: 180px;
    box-sizing: border-box;
`
const UserName = styled.h1`
    font-family: Arial, Helvetica, sans-serif; //trocar pra Lato
    font-size: 19px;
    font-weight: 400;
    line-height: 23px;
    color: #FFFFFF;
    margin-bottom: 6px;
`
const Body = styled(UserName)`
    font-size: 17px;
    color: #B7B7B7;
`
const Link = styled.div`
    box-sizing: border-box;
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: top;
    cursor: pointer;

    @media (max-width: 650px) {
        width: 100%;
        height: 115px;
    }
`
const LinkContents = styled.div`
    margin-left: 20px;
    margin-top: 20px;

    @media (max-width: 650px) {
        margin-left: 10px;
    }
`
const Title = styled.h1`
    font-family: Arial, Helvetica, sans-serif; //trocar pra Lato;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: left;
    color: #CECECE;
    margin-bottom: 10px;

    @media (max-width: 650px) {
        font-size: 10px;
    }
`
const Description = styled(Title)`
    color: #9B9595;
    font-size: 11px;
    line-height: 13px;

    @media (max-width: 650px) {
        font-size: 8px;
        line-height: 10px;
    }
`
const Url = styled(Description)`
    color: #CECECE;
`
const LinkImage = styled.img`
    width: 153.44px;
    height: 153px;
    border-radius: 0px 12px 13px 0px;

    @media (max-width: 650px) {
        width: 30%;
        height: 113px;
    }
`