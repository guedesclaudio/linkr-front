import { PostBox, UserImage } from "../styles/common";
import { insertPost } from "../services/services";
import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext.js";

export default function Publish () {
    const [form, setForm] = useState({
        post_url: "",
        body: ""
    });
    const [isDisabled, setIsDisabled] = useState(false);
    const [thereWasError, setThereWasError] = useState(false);
    const { token } = useContext(UserContext);
    
    function handleForm (e) {
        return setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    
    async function submitForm(e) {
        e.preventDefaul();
        setIsDisabled(true);
    
        try {
            await insertPost(form, token);
            setIsDisabled(false);
                setForm({
                    post_url: "",
                    body: ""
                });
            //getPosts
            
        } catch (error) {
            setThereWasError(true);
            setIsDisabled(false);
        }
    }

    return (
        <PostBox isPublish={true}>
            <UserImage></UserImage>
            <PostContent onSubmit={submitForm}>
                <Question>What are you going to share today?</Question>
                <InputPost content='url'
                    name='post_url'
                    type='url'
                    value={form.post_url}
                    placeholder='http://...'
                    onchange={handleForm}
                    disabled={isDisabled}
                    ></InputPost>
                <InputPost content='comment'
                    name='body'
                    type='text'
                    value={form.body}
                    placeholder='Awesome article about #javascript'
                    onchange={handleForm}
                    disabled={isDisabled}
                    ></InputPost >
                <ButtonPublish type='submit' disabled={isDisabled}>
                    {isDisabled ? "Publishing..." : "Publish"}
                </ButtonPublish>

                {thereWasError
                    ? <ErrorMessage>There was an error posting your link</ErrorMessage>
                    : ""}
                
            </PostContent>
        </PostBox>
    )
}

const PostContent = styled.div`
    width: 503px;
    display: flex;
    flex-direction: column;

    position: relative;
`;

const Question = styled.div`
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    margin-bottom: 10px;
`;

const InputPost = styled.input`
    margin-bottom: ${props => props.content === 'url' ? '5px' : '36px'};
    padding: 5px 13px;
    min-height: ${props => props.content === 'url' ? '30px' : '66px'};
    border: none;
    border-radius: 5px;
    background-color: #EFEFEF;

    display: flex;
    justify-content: flex-start;

    &::placeholder {
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        color: #949494;
        text-align: start;
    }
`;

const ButtonPublish = styled.button`
    width: 112px;
    height: 31px;
    border-radius: 5px;
    background-color: #1877F2;
    box-shadow: none;
    border: none;

    color: white;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 16.8px;

    position: absolute;
    bottom: 0;
    right: 0;
`;

const ErrorMessage = styled.div`

`;