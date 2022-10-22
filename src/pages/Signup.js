import styled from "styled-components";
import logo from "../assets/img/logo.png";
import FormWrapper from "../components/FormWrapper";
import Slogan from "../components/Slogan";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSignUp } from "../services/services";

export default function Signup() {
  const [form, setForm] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }
  async function sendForm() {
    const body = { ...form };
    setButtonDisabled(true);
    try {
      await postSignUp(body);
      alert("Usuário criado com sucesso!");
      navigate("/");
    } catch (error) {
      alert(JSON.stringify(error.response.data));
      console.log(error);
      setButtonDisabled(false);
    }
  }

  return (
    <PageWrapper>
      <Slogan>
        <img src={logo} alt="Logo" />
        <h1>save, share and discover the best links on the web</h1>
      </Slogan>
      <FormWrapper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendForm();
          }}
        >
          <input
            placeholder="e-mail"
            name="email"
            type="email"
            required
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
          ></input>
          <input
            placeholder="password"
            name="password"
            type="password"
            required
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
          ></input>
          <input
            placeholder="username"
            name="username"
            type="text"
            required
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
          ></input>
          <input
            placeholder="picture url"
            name="picture_url"
            type="text"
            required
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
          ></input>
          <button disabled={buttonDisabled}>Sign Up</button>
          <p onClick={() => navigate("/home")}>Switch back to log in</p>
        </form>
      </FormWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;

  @media (max-width: 460px) {
    flex-direction: column;
  }
`;
