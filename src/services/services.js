import axios from "axios";

const baseUrlTest = "http://localhost:5001"; //url de teste
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

function insertPost(body, token) {
  return axios.post(`${baseUrlTest}/posts`, body, token);
}

function verifyToken(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${baseUrlTest}/sessions`, config);
}

function postLogout(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(`${baseUrlTest}/logout`, {}, config);
}

function postNewBody(token, post_id, body) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      PostId: post_id,
    },
  };
  return axios.put(`${baseUrlTest}/posts`, body, config);
}

function deletePost(token, post_id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      PostId: post_id,
    },
  };
  return axios.delete(`${baseUrlTest}/posts`, config);
}

function getHashtagList(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${baseUrlTest}/hashtags`, config);
}

export {
  getPostsData,
  sendLikeOrDeslike,
  postSignUp,
  postSignIn,
  verifyToken,
  postLogout,
  postSearchUser,
  insertPost,
  postNewBody,
  deletePost,
  getHashtagList,
};
