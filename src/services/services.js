import axios from "axios";

const baseUrlTest = "http://localhost:5000"; //url de teste
const baseUrlProduction = "https://linkr-backend-api.herokuapp.com"; //url de producao

function getPostsData({userId}) {
  return axios.get(`${baseUrlTest}/timeline/${userId}`) //pegar config
}

function sendLikeOrDeslike({postId, likeValue, userId}) {
  return axios.post(`${baseUrlTest}/likes/${postId}`, {userId, likeValue}) //pegar config
}

function postSignUp(body) {
  return axios.post(`${baseUrlTest}/signup`, body);
}

function postSignIn(body) {
  return axios.post(`${baseUrlTest}/signin`, body);
}

function insertPost(body, token) {
  return axios.post(`${baseUrlTest}/posts`, body, token);
}

export { 
  getPostsData,
  sendLikeOrDeslike,
  postSignUp,
  postSignIn,
  insertPost 
};
