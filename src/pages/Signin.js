import styled from "styled-components";
import logo from "../assets/img/logo.png";
import FormWrapper from "../components/FormWrapper";
import Slogan from "../components/Slogan";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSignIn } from "../services/services";
import { UserContext } from "../contexts/UserContext";
import verifyStoredToken from "../utils/verifyStoredToken";

export default function Signin() {
  const { setUserData } = useContext(UserContext);
  const [form, setForm] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const storedToken = verifyStoredToken();
  useEffect(() => {
    if (storedToken) {
      setUserData({ token: storedToken });
      navigate("/home");
    }
  }, []);

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
      const response = await postSignIn(body);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setUserData({ token: response.data.token });
      navigate("/timeline");
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        alert(JSON.stringify(error.response.data));
      }
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
          <button disabled={buttonDisabled}>Log In</button>
          <p onClick={() => navigate("/sign-up")}>
            First time? Create an account!
          </p>
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
