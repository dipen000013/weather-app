import axios from '../api/api';
import * as config from '../configs';
/**
 * Get wearther detail from open wearther using selected city
 * @returns axios promise object
 */
export const fetchWeatherDetailByCityQuery = (city) =>
  axios.get(`?q=${city}&units=metric&appid=${config.apiKey}`);

export default {
  fetchWeatherDetailByCityQuery,
};
