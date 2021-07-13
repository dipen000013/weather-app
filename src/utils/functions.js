/* eslint-disable no-plusplus */

import { toast } from 'react-toastify';

const showUnhandledErrors = (messageToDisplay) => {
  toast.error(messageToDisplay, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const showOnSuccessToastify = (messageToDisplay) => {
  toast.success(messageToDisplay, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const handleErrorResponse = (err) => {
  showUnhandledErrors(err?.message);
};

const setLocalStorageData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageData = (key) => {
  if (localStorage.getItem(key)) {
    const dec = localStorage.getItem(key);
    if (dec && dec !== 'undefined') {
      return JSON.parse(dec);
    }
    return null;
  }
  return null;
};

const removeLocalStorageData = (key) => {
  localStorage.removeItem(key);
};

const getWeatherIconName = (selectedWeather) => {
  let name = 'Day-time';
  if (selectedWeather?.weather?.length > 0) {
    name = selectedWeather?.weather[0].description;
    name = name.replace(/\s+/g, '-');
  }
  return name;
};

export {
  showUnhandledErrors,
  showOnSuccessToastify,
  handleErrorResponse,
  setLocalStorageData,
  getLocalStorageData,
  removeLocalStorageData,
  getWeatherIconName,
};
