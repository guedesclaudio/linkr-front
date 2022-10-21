import styled from "styled-components";
import Post from "./Post";
import { useEffect, useState, useContext } from "react";
import { getPostsData } from "../services/services";
import { UserContext } from "../contexts/UserContext";

export default function Posts() {

    const { posts, setPosts, userData } = useContext(UserContext);
    const [message, setMessage] = useState("Loading...")
    const [callApi, setCallApi] = useState(true)
    const config = {headers: {"Authorization": `Bearer ${userData.token}`}}

    useEffect(async ()=> {
        try {
            const response = await getPostsData(config) //aunteticar
            
            if (response.data.length === 0) {
                setMessage("There are no posts yet")
            }
            setPosts(response.data)
            
        } catch (error) {
            setMessage("An error occured while trying to fetch the posts, please refresh the page")
            console.log(error)
        }
    }, [callApi])


    return (
        <Container>
            {posts.length > 0 ? 
            posts.map((value, index) => <Post key = {index} userId = {value.user_id}
            username = {value.owner_post} picture_url = {value.picture_url} postId = {value.id}
            body = {value.body} post_url = {value.post_url} metadata = {value.metadata} 
            liked = {value.liked} likesCount = {value.likesCount} messageToolTip = {value.messageToolTip} 
            callApi = {callApi} setCallApi = {setCallApi}/>) :
            <LoadMessage>{message}</LoadMessage>}
        </Container>
    )
}

const Container = styled.div`
    width: 611px;
    margin: 100px auto;

    @media (max-width: 650px) {
        width: 100vw;
    }
`
const LoadMessage = styled.div`
    width: 200px;
    margin: 340px auto;
    color: white;
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    font-weight: 400;
    text-align: center;
`