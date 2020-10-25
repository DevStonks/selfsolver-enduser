import decode from "jwt-decode";
import { tokenStorageKey } from "../config";

export default {
  delete() {
    return localStorage.removeItem(tokenStorageKey);
  },
  get() {
    return localStorage.getItem(tokenStorageKey);
  },
  read() {
    return decode(this.get());
  },
  save(token) {
    return localStorage.setItem(tokenStorageKey, token);
  },
};
