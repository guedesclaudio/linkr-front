import Posts from "../components/Posts";
import Navbar from "../components/Navbar";
import { useContext, useEffect } from "react";
import verifyStoredToken from "../utils/verifyStoredToken";
import { UserContext } from "../contexts/UserContext";

export default function Home() {
  const { setUserData, userData } = useContext(UserContext);
  const tokenStored = JSON.parse(localStorage.getItem("token"));

  useEffect(async () => {
    if (tokenStored) {
      const validToken = await verifyStoredToken();
      if (validToken) {
        setUserData({ token: validToken });
      }
    }
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Posts></Posts>
    </>
  );
}
