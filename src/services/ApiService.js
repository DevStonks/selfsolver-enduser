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
  getDevices: () => api.get("/devices"),
  getDefects: () => api.get("/defects"),
  getSolutions: (ticketId) => api.get(`/tickets/${ticketId}/solutions`),
  getTickets: () => api.get("/tickets"),
  postTicket: (ticket) => api.post("/tickets", ticket),
  closeTicket: (ticketId, solutionId) =>
    api.put(`/tickets/${ticketId}`, { solution: solutionId }),
  forwardTicket: (ticketId) =>
    api.put(`/tickets/${ticketId}`, { forwarded: true }),
};
