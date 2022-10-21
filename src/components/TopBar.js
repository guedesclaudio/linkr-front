import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import Search from "./Search.js";

/* import { logoutUser } from "../../services/requests"; */

export default function TopBar() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("userLocal"));

  console.log(auth);
  return (
    <>
      <Bar>
        <Logo onClick={() => navigate("/home")}>
          <img src={logo} alt="Logo" />
        </Logo>
        <Search />
        <UserLogout></UserLogout>
      </Bar>
    </>
  );
}

const Bar = styled.div`
  background-color: #151515;
  height: 72px;
  width: 100%;
  padding: 0px 17px 0px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const Logo = styled.div`
  img {
    width: 108px;
  }
`;

const UserLogout = styled.div`
  width: 88px;
  border-radius: 8px;
`;
