import axios from "axios";

const baseUrlTest = "http://localhost:5000"; //url de teste
const baseUrlProduction = "https://linkr-backend-api.herokuapp.com"; //url de producao

function getPostsData() {
  return axios.get(`${baseUrlTest}/timeline`); //pegar config
}

function postSignUp(body) {
  return axios.post(`${baseUrlTest}/signup`, body);
}

function postSignIn(body) {
  return axios.post(`${baseUrlTest}/signin`, body);
}

function verifyToken(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${baseUrlTest}/sessions`, config);
}

export { getPostsData, postSignUp, postSignIn, verifyToken };
