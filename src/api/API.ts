import axios from "axios"

const BACKEND_URL = 'http://localhost:5000/'

export const API = axios.create({
  baseURL: BACKEND_URL,
  responseType: 'json',
})