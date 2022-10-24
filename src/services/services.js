import axios from "axios";

const baseUrlTest = "http://localhost:5001"; //url de teste
const baseUrlProduction = "https://linkr-backend-api.herokuapp.com"; //url de producao

function getPostsData(config) {
  return axios.get(`${baseUrlProduction}/timeline`, config); //pegar config
}

function sendLikeOrDeslike({ postId, likeValue, config }) {
  return axios.post(`${baseUrlProduction}/likes/${postId}`, { likeValue }, config); //pegar config
}

function postSignUp(body) {
  return axios.post(`${baseUrlProduction}/signup`, body);
}

function postSignIn(body) {
  return axios.post(`${baseUrlProduction}/signin`, body);
}
function postSearchUser(token, search) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(`${baseUrlProduction}/search`, search, config);
}

function insertPost(body, token) {
  return axios.post(`${baseUrlProduction}/posts`, body, token);
}

function verifyToken(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${baseUrlProduction}/sessions`, config);
}

function postLogout(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(`${baseUrlProduction}/logout`, {}, config);
}

function postNewBody(token, post_id, body) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      PostId: post_id,
    },
  };
  return axios.put(`${baseUrlProduction}/posts`, body, config);
}

function deletePost(token, post_id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      PostId: post_id,
    },
  };
  return axios.delete(`${baseUrlProduction}/posts`, config);
}

function getHashtagList(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${baseUrlProduction}/hashtags`, config);
}

function getHashtag(token, hashtag_id) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${baseUrlProduction}/hashtag/${hashtag_id}`, config);
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
  getHashtag,
};
