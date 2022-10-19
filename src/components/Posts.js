import { useEffect, useState } from "react";
import styled from "styled-components";

function Post({
    username,
    picture_url,
    body,
    post_url
}) {
    return (
        <PostBox>
            <UserImage src = {picture_url}/>
            <Contents>
                <UserName>{username}</UserName>
                <Body>{body}</Body>
                <Link></Link>
            </Contents>
        </PostBox>
    )
}

export default function Posts() {

    const [data, setData] = useState([
        {
            username: "Claudio",
            picture_url: "https://veja.abril.com.br/wp-content/uploads/2021/07/Gabriel-Medina.jpeg",
            body: "Muito legal esse post",
            post_url: "www"
        },
        {
            username: "Claudio",
            picture_url: "https://veja.abril.com.br/wp-content/uploads/2021/07/Gabriel-Medina.jpeg",
            body: "Muito legal esse post",
            post_url: "www"
        } 
    ])

    useEffect(()=> {
        //
    }, [])


    return (
        <Container>
            {data.map((value, index) => <Post key = {index} 
            username = {value.username} picture_url = {value.picture_url} 
            body = {value.body} post_url = {value.post_url}/>)}
        </Container>
    )
}

const PostBox = styled.div`
    width: 611px;
    height: 276px;
    background-color: #171717;
    border-radius: 16px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: top;
`
const UserImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin-top: 20px;
    margin-left: 20px;
`
const Contents = styled.div`
    margin-top: 20px;
    margin-right: 20px;
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
`
const Container = styled.div`
    width: 611px;
    margin: 100px auto;
`