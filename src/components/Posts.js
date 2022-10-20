import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPostsData } from "../services/services";
import Post from "./Post";

export default function Posts() {

    const [posts, setPosts] = useState([])
    const [message, setMessage] = useState("Loading...")

    useEffect(async ()=> {
        try {
            const response = await getPostsData() //passar config
            
            if (response.data.length === 0) {
                setMessage("There are no posts yet")
            }
            setPosts(response.data)
            
        } catch (error) {
            setMessage("An error occured while trying to fetch the posts, please refresh the page")
            console.log(error)
        }
    }, [])


    return (
        <Container>
            {posts.length > 0 ? 
            posts.map((value, index) => <Post key = {index} 
            username = {value.username} picture_url = {value.picture_url} 
            body = {value.body} post_url = {value.post_url} metadata = {value.metadata}/>) :
            <LoadMessage>{message}</LoadMessage>
        }
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
    font-family: Arial, Helvetica, sans-serif; //trocar pra Lato
    font-size: 19px;
    font-weight: 400;
    text-align: center;
`