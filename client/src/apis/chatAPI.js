import axios from 'axios';
const SERVER = process.env.REACT_APP_SERVER;

axios.defaults.withCredentials = true;

export const getMessages = (id) => {
  return axios.get(`${SERVER}/chats/get_messages?id=${id}`);
}

export const addMessage = (message, id) => {
  return axios.post(`${SERVER}/chats/add_message`, { message, id });
}