import { tokenStorageKey } from "../config";

export default {
  save(token) {
    return localStorage.setItem(tokenStorageKey, token);
  },
  get() {
    return localStorage.getItem(tokenStorageKey);
  },
  delete() {
    return localStorage.removeItem(tokenStorageKey);
  },
};
