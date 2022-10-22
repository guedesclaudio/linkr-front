import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup.js";
import Signin from "../pages/Signin";
import Home from "../pages/Home";
import { UserStorage } from "../contexts/UserContext";

export default function App() {
  return (
    <>
      <UserStorage>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/timeline" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </UserStorage>
    </>
  );
}
