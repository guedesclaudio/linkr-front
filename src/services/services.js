import axios from "axios";

const baseUrlTest = "http://localhost:5000"; //url de teste
const baseUrlProduction = "https://linkr-backend-api.herokuapp.com"; //url de producao

function getPostsData(config) {
  return axios.get(`${baseUrlTest}/timeline`, config); //pegar config
}

function sendLikeOrDeslike({ postId, likeValue, config }) {
  return axios.post(`${baseUrlTest}/likes/${postId}`, { likeValue }, config); //pegar config
}

function postSignUp(body) {
  return axios.post(`${baseUrlTest}/signup`, body);
}

function postSignIn(body) {
  return axios.post(`${baseUrlTest}/signin`, body);
}
function postSearchUser(search) {
  return axios.post(`${baseUrlTest}/search`, search);
}

function verifyToken(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${baseUrlTest}/sessions`, config);
}

export {
  getPostsData,
  sendLikeOrDeslike,
  postSignUp,
  postSignIn,
  postSearchUser,
  verifyToken,
};
