import axios from "axios"

const baseUrlTest = "http://localhost:5000" //url de teste
const baseUrlProduction = "https://linkr-backend-api.herokuapp.com/" //url de producao

function getPostsData() {
    return axios.get(`${baseUrlTest}/timeline`) //pegar config
}

export {getPostsData}