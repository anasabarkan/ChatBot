import axios from 'axios';

const api = axios.create({
  baseURL: 'https://chatbot-tu2h.onrender.com/api',
});

export default api;
