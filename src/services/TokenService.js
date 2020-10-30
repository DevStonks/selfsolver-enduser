import decode, { InvalidTokenError } from "jwt-decode";
import { tokenStorageKey } from "../config";

export default {
  delete() {
    return localStorage.removeItem(tokenStorageKey);
  },
  get() {
    return localStorage.getItem(tokenStorageKey);
  },
  read() {
    try {
      return decode(this.get());
    }
    catch (error) {
      if (error instanceof InvalidTokenError) { return false }
      else { throw (error) }
    }
  },
  save(token) {
    return localStorage.setItem(tokenStorageKey, token);
  },
};
