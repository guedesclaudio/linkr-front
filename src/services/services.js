import axios from "axios";

const baseUrlTest = "https://linkr-backend-api.herokuapp.com"; //url de teste http://localhost:5000
const baseUrlProduction = "https://linkr-backend-api.herokuapp.com"; //url de producao

function getPostsData(pageValue, config) {
  return axios.get(`${baseUrlTest}/timeline?page=${pageValue}`, config); //pegar config
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
function postSearchUser(token, search) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(`${baseUrlTest}/search`, search, config);
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

function getHashtag(token, hashtag_id) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${baseUrlTest}/hashtag/${hashtag_id}`, config);
}

function postFollowOrUnfollow(token, followed_id, follow_type) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const body = { followed_id, follow_type };
  return axios.post(`${baseUrlTest}/followers`, body, config);
}

function getFollowedList(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${baseUrlTest}/followers`, config);
}

function getUserById(userId) {
  return axios.get(`${baseUrlTest}/users/${userId}`);
}

function postRepost({ config, postId }) {
  return axios.post(`${baseUrlTest}/reposts/${postId}`, {}, config);
}

function insertComment(body, token, post_id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      PostId: post_id,
    },
  };
  return axios.post(`${baseUrlTest}/comments`, body, config);
}

function getComments(token, post_id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  return axios.get(`${baseUrlTest}/comments/${post_id}`, config);
}

function getIfIsPostsAuthor(token, post_id, author_id, comment_id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  return axios.get(`${baseUrlTest}/comments/${post_id}/${author_id}/${comment_id}`, config);
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
  postFollowOrUnfollow,
  getFollowedList,
  getUserById,
  postRepost,
  insertComment,
  getComments,
  getIfIsPostsAuthor
};
