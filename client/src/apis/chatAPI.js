import axios from 'axios';
const SERVER = process.env.REACT_APP_SERVER;

axios.defaults.withCredentials = true;

export const getMessages = (id, fromDate = null) => {
  return axios.get(`${SERVER}/chats/get_messages`, { params: { id, fromDate }});
}

export const getMessagesUnread = (id) => {
  return axios.get(`${SERVER}/chats/get_messages_unread`, { params: { id }});
}

export const getUnreadMessagesCount = (id) => {
  return axios.get(`${SERVER}/chats/get_unread_messages_count?id=${id}`);
}

export const addMessage = (message, id) => {
  return axios.post(`${SERVER}/chats/add_message`, { message, id });
}

export const readMessages = (id, messages) => {
  return axios.post(`${SERVER}/chats/read_messages`, { id, messages });
}

export const getChatId = (id) => {
  return axios.get(`${SERVER}/chats/get_chat_id?id=${id}`);
}