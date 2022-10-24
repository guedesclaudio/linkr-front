import { getPostsData } from "../services/services";

export default async function listPosts() {
  const userToken = JSON.parse(localStorage.getItem("user")).token;
  const config = { headers: { Authorization: `Bearer ${userToken}` } };
  const response = await getPostsData(config);
  return response.data;
}
