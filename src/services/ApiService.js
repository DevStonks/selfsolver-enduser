import axios from "axios";
import { selfsolverApi } from "../config";
import TokenService from "./TokenService";

const api = axios.create({
  baseURL: selfsolverApi,
});

api.interceptors.request.use(
  (request) => {
    if (TokenService.read()) {
      request.headers.common.Authorization = `Bearer ${TokenService.get()}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

export default {
  login: (email, password) => api.post(`/login`, { email, password }),
  getTickets: () => api.get("/tickets"),
  getDevices: () => api.get("/devices"),
  getDefects: () => api.get("/defects"),
  postTicket: (ticket) => api.post("/tickets", ticket),
};
