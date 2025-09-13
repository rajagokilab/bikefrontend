import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const register = (username, email, password) => {
  return axios.post(API_URL + "users/register/", {
    username,   // ✅ Django expects "username"
    email,
    password,
  });
};
