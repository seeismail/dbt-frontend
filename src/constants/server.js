import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://5025a33ca810.ngrok.io',
});
