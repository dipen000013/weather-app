import axios from 'axios';
import * as config from '../configs';

const instance = axios.create({
  baseURL: config.api,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default instance;
