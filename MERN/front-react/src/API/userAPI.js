import axios from "axios";
import { urlUsers } from "./url";

export const registerPost = (usuario) => {
  return axios.post(urlUsers + "/register", usuario);
};

export const loginPost = (usuario) => {
  return axios.post(urlUsers + "/login", usuario);
};
