import axios from "axios";
import { selfsolverApi } from "../config";

const api = axios.create({
  baseURL: selfsolverApi,
});

export default {
  login: (email, password) => api.post(`/login`, { email, password }),
};
