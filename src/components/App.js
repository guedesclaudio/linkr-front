import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
