import axios from "axios";
const SERVER = process.env.REACT_APP_SERVER;

axios.defaults.withCredentials = true;

export const post = (data) => {
  return axios.post(`${SERVER}/posts/post`, data);
}

export const getPosts = () => {
  return axios.get(`${SERVER}/posts/get_posts_all`);
}

export const getPostsUser = (id) => {
  return axios.get(`${SERVER}/posts/get_posts_user?id=${id}`);
}

export const getComments = (id) => {
  return axios.get(`${SERVER}/posts/get_comments?id=${id}`);
}

export const addComment = (id, comment) => {
  return axios.post(`${SERVER}/posts/add_comment`, { id, comment });
}

export const addLike = (id) => {
  return axios.post(`${SERVER}/posts/like`, { id });
}