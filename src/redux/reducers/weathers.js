import {
  START_FETCH_WEATHER_DETAIL,
  SUCCESS_FETCH_WEATHER_DETAIL,
  ERROR_FETCH_WEATHER_DETAIL,
  RESET_WEATHER_LIST,
  SET_SELECTED_WEATHER_DETAIL,
  RESET_SELECTED_WEATHER_DETAIL,
  SET_GLOBAL_LOADER_STATUS,
  UPDATE_WEATHER_LIST_DATA,
} from '../actions/weatherActionsTypes';

const initialState = {
  detailIsLoading: false,
  weatherList: [],
  errorFetchingWeatherDetail: '',
  selectedWeather: {},
  isGlobalLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_FETCH_WEATHER_DETAIL:
      return {
        ...state,
        detailIsLoading: true,
      };
    case SUCCESS_FETCH_WEATHER_DETAIL: {
      const weathersList = state.weatherList;
      const index = weathersList.findIndex(
        (item) => item.id === action.weatherDetail.id,
      );
      if (index > -1) {
        weathersList[index] = action.weatherDetail;
      } else {
        weathersList.push(action.weatherDetail);
      }
      return {
        ...state,
        detailIsLoading: false,
        weatherList: [...weathersList],
      };
    }
    // case SUCCESS_FETCH_WEATHER_DETAIL:
    //   return {
    //     ...state,
    //     detailIsLoading: false,
    //     weatherList: [...state.weatherList, action.weatherDetail],
    //   };
    case ERROR_FETCH_WEATHER_DETAIL:
      return {
        ...state,
        detailIsLoading: false,
        errorFetchingWeatherDetail: action.error,
      };
    case RESET_WEATHER_LIST:
      return {
        ...state,
        weatherList: [],
      };
    case UPDATE_WEATHER_LIST_DATA:
      return {
        ...state,
        weatherList: [...action.weatherList],
      };
    case SET_SELECTED_WEATHER_DETAIL: {
      return {
        ...state,
        selectedWeather: action.selectedWeather,
      };
    }
    case RESET_SELECTED_WEATHER_DETAIL: {
      return {
        ...state,
        selectedWeather: {},
      };
    }
    case SET_GLOBAL_LOADER_STATUS:
      return {
        ...state,
        isGlobalLoading: action.status,
      };
    default:
      return state;
  }
};
