import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const API = axios.create({
  baseURL: BASE_URL,
});

export default API;