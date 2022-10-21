import axios from "axios";

const baseUrlTest = "http://localhost:5000"; //url de teste
const baseUrlProduction = "https://linkr-backend-api.herokuapp.com"; //url de producao

function getPostsData(config) {
  return axios.get(`${baseUrlTest}/timeline`, config) //pegar config
}

function sendLikeOrDeslike({postId, likeValue, config}) {
  console.log(config)
  return axios.post(`${baseUrlTest}/likes/${postId}`, {likeValue}, config) //pegar config
}

function postSignUp(body) {
  return axios.post(`${baseUrlTest}/signup`, body);
}

function postSignIn(body) {
  return axios.post(`${baseUrlTest}/signin`, body);
}

export { getPostsData, sendLikeOrDeslike, postSignUp, postSignIn };
