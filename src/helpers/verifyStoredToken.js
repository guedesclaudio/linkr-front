import { verifyToken } from "../services/services";

export default async function verifyStoredToken() {
  const userStored = JSON.parse(localStorage.getItem("user"));

  if (userStored) {
    try {
      const response = await verifyToken(userStored.token);
      return response.data.token;
    } catch (error) {
      console.log(error);
    }
  }
  return false;
}
