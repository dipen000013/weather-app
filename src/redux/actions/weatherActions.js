import {
  START_FETCH_WEATHER_DETAIL,
  SUCCESS_FETCH_WEATHER_DETAIL,
  ERROR_FETCH_WEATHER_DETAIL,
  RESET_WEATHER_LIST,
  SET_SELECTED_WEATHER_DETAIL,
  RESET_SELECTED_WEATHER_DETAIL,
  SET_GLOBAL_LOADER_STATUS,
  UPDATE_WEATHER_LIST_DATA,
} from './weatherActionsTypes';

import { fetchWeatherDetailByCityQuery } from '../../services/weatherService';

import { handleErrorResponse } from '../../utils/functions';

/**
 * This function used for getting detail for weather for selected city
 * @param {*} requestParams
 */
export function fetchWeatherDetail(city) {
  return (dispatch) => {
    dispatch(fetchWeatherDetailStart());
    fetchWeatherDetailByCityQuery(city)
      .then((data) => {        
        if (data?.data) {
          dispatch(fecthWeatherDetailSuccess(data?.data));
        }
      })
      .catch((err) => {
        handleErrorResponse(err);
        dispatch(fetchWeatherDetailFailure('A network error occured'));
      });
  };
}

function fetchWeatherDetailStart() {
  return {
    type: START_FETCH_WEATHER_DETAIL,
  };
}

function fecthWeatherDetailSuccess(weatherDetail) {
  return {
    type: SUCCESS_FETCH_WEATHER_DETAIL,
    weatherDetail,
  };
}

function fetchWeatherDetailFailure(error) {
  return {
    type: ERROR_FETCH_WEATHER_DETAIL,
    error,
  };
}

/** This function used for reset weather detail */
export function resetWeatherDetail() {
  return {
    type: RESET_WEATHER_LIST,
  };
}

/** This function used for update weather list */
export function updateWeatherList(weatherList) {
  return {
    type: UPDATE_WEATHER_LIST_DATA,
    weatherList,
  };
}

/**
 * This function used for set selected wearther detail
 * @param {*} selectedWeather
 */
export function setSelectedWeatherDetail(selectedWeather) {
  return {
    type: SET_SELECTED_WEATHER_DETAIL,
    selectedWeather,
  };
}

/**
 * This function used for reset selected wearther detail
 */
export function resetSelectedWeatherDetail() {
  return {
    type: RESET_SELECTED_WEATHER_DETAIL,
  };
}

export function setGlogalLoader(status) {
  return {
    type: SET_GLOBAL_LOADER_STATUS,
    status,
  };
}