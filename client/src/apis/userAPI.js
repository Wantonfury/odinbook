import axios from "axios";
const SERVER = process.env.REACT_APP_SERVER;

const login = (data) => {
  return axios.post(`${SERVER}/auth/login`, data, { withCredentials: true });
}

const logout = () => {
  return axios.post(`${SERVER}/auth/logout`, { withCredentials: true });
}

const signup = () => {
  
}

export {
  login,
  logout,
  signup
};