import styled from "styled-components"
import PostContents from "./PostContents.js"
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { IconContext } from "react-icons";
import { useEffect, useState, useContext } from "react";
import { sendLikeOrDeslike } from "../services/services";
import { UserContext } from "../contexts/UserContext";

export default function Post({
    username,
    picture_url,
    postId,
    body,
    post_url,
    metadata,
    liked,
    likesCount,
    callApi,
    setCallApi
}) {

    const [like, setLike] = useState(liked)
    const likesIsOne = likesCount === "1" ? "1 curtida" : ` ${likesCount} curtidas`
    const [heartColor, setHeartColor] = useState("white")
    const config = {headers: {"Authorization": `Bearer a8e5aa37-457d-4447-ad79-983195b07630`}}
    const { userData } = useContext(UserContext);
    
    useEffect(() => {
        liked ? setHeartColor("red") : setHeartColor("white")
    }, [])
    

    function likeOrDeslike(value) {
        if (value) {
            setLike(true)
            setHeartColor("red")
            setTimeout(() => setCallApi(callApi + 1), 250)
            sendLikeOrDeslike({postId, likeValue: true, config}) //autenticar
            return
        }
        setLike(false)
        setHeartColor("white")
        setTimeout(() => setCallApi(callApi + 1), 250)
        sendLikeOrDeslike({postId, likeValue: false, config}) //autenticar
    }

    return (
        <PostBox>
            <UserAndLikes>
                <UserImage src = {picture_url}/>
                <IconContext.Provider value={{color: `${heartColor}`, className: "class-like"}}>
                    <Likes>
                        {like ? 
                        <IoIosHeart onClick = {() => likeOrDeslike(false)}/> :
                        <IoIosHeartEmpty onClick = {()=> likeOrDeslike(true)}/>}
                        <LikesCount>{!likesCount ? "0 curtidas" : likesIsOne}</LikesCount>
                    </Likes>
                </IconContext.Provider>
            </UserAndLikes>
            <PostContents username = {username} body = {body} post_url = {post_url} metadata = {metadata}/>
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
    
    && .class-like {
        margin: 30px 0 15px 0;
        color: ${props => props.color};
        font-size: 20px;
        cursor: pointer;
    }
`
const Likes = styled(UserAndLikes)`
    min-height: 80px;
`
const LikesCount = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 13px;
    color: #FFFFFF;
`