import styled from "styled-components";
import logo from "../assets/img/logo.png";
import { useState } from "react";
import FormWrapper from "../components/FormWrapper";
import LogoWrapper from "../components/LogoWrapper";

export default function Signup() {
  const [form, setForm] = useState({});

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }
  async function sendForm() {}

  return (
    <PageWrapper>
      <LogoWrapper>
        <img src={logo} alt="Logo" />
        <h1>save, share and discover the best links on the web</h1>
      </LogoWrapper>
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
            name="name"
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
          <button>Sign Up</button>
          <p>Switch back to log in</p>
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
