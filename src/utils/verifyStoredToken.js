import { verifyToken } from "../services/services";

export default async function verifyStoredToken() {
  const tokenStored = JSON.parse(localStorage.getItem("token"));

  if (tokenStored) {
    try {
      const response = await verifyToken(tokenStored);
      return response.data.token;
    } catch (error) {
      console.log(error);
    }
  }
  return false;
}
