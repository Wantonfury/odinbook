import axios from 'axios';
const SERVER = process.env.REACT_APP_SERVER;

axios.defaults.withCredentials = true;

export const uploadProfileFile = (file) => {
  return axios.post(`${SERVER}/files/upload_profile_file`, file, { headers: { "Content-Type": 'multipart/form-data' }});
}