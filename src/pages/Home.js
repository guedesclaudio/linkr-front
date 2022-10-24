import TimeLine from "../components/Timeline";
import Navbar from "../components/Navbar";
import { useContext, useEffect } from "react";
import verifyStoredToken from "../utils/verifyStoredToken";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { setUserData, userData } = useContext(UserContext);
  const tokenStored =
    JSON.parse(localStorage.getItem("user")).token || userData.token;
  const navigate = useNavigate();

  useEffect(async () => {
    if (tokenStored) {
      const validToken = await verifyStoredToken();
      if (validToken) {
        const userStored = JSON.parse(localStorage.getItem("user"));
        setUserData({
          token: userStored.token,
          userImage: userStored.picture_url,
        });
      } else if (!validToken) {
        localStorage.setItem("token", JSON.stringify(""));
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);
  console.log(tokenStored);
  return (
    <>
      <Navbar></Navbar>
      <TimeLine></TimeLine>
    </>
  );
}
