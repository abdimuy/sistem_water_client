import axios from 'axios';
import ENTRYPOINTS from './entrypoints';
// const BASE_URL = 'http://localhost:3000';

const API = axios.create({
  baseURL: ENTRYPOINTS.BASE_URL,
});

export default API;