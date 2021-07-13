import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchCity from './Components/SearchCity';
import MainWidget from './Components/MainWidget';
import WidgetList from './Components/WidgetList';

import {
  setSelectedWeatherDetail,
  fetchWeatherDetail,
  updateWeatherList,
} from '../../redux/actions/weatherActions';

import {
  setLocalStorageData,
  getLocalStorageData,
} from '../../utils/functions';

function HomePage(props) {
  const { weatherList, selectedWeather } = props;
  
  useEffect(() => {
    if (weatherList?.length === 0) {
      const weatherData = getLocalStorageData('weather_data');
      if (weatherData) {
        props.updateWeatherList(weatherData);
      }
    }
  }, []);

  useEffect(() => {    
    if (Object.keys(selectedWeather)?.length === 0 && weatherList?.length > 0) {
      const selectedData = weatherList.find((item) => item.selected === true);
      if (selectedData) {
        props.setSelectedWeatherDetail(selectedData);
      } else {
        props.setSelectedWeatherDetail(weatherList[0]);
      }
    }
    if (weatherList?.length > 0) {
      setLocalStorageData('weather_data', weatherList);
    }
  }, [weatherList]);

  /** Search seather details based on the enter city name */
  const onSerachWeather = (city) => {
    props.fetchWeatherDetail(city);
  };

  /** Used for changed selected weather detail and show in main widget */
  const changeWeatherDetail = (weather) => {
    props.setSelectedWeatherDetail(weather);
    window.scrollTo(0, 0);
  };

  /** Used for delete selected weather from list */
  const onDeleteWeather = () => {
    const index = weatherList.findIndex(
      (item) => item.id === selectedWeather.id,
    );
    if (index > -1) {
      weatherList.splice(index, 1);
    }
    props.setSelectedWeatherDetail({});
    props.updateWeatherList(weatherList);
  };

  /** used for set default weather from list */
  const onSetDefualtWeather = () => {
    const index = weatherList.findIndex(
      (item) => item.id === selectedWeather.id,
    );
    weatherList?.filter((item) => {
      item.selected = false;
    });
    if (index > -1) {
      weatherList[index].selected = true;
      props.updateWeatherList(weatherList);
    }
  };

  const getBackClassName = () => {
    let codId = 0;
    if (selectedWeather?.weather?.length > 0) {
      codId = selectedWeather?.weather[0].id;
    }
    if (codId >= 801 && codId <= 804) {
      return 'bg-overcast';
    }
    if (codId === 800) {
      return 'bg-sunny';
    }
    if (codId >= 701 && codId <= 781) {
      return 'bg-night';
    }
    if (codId >= 600 && codId <= 622) {
      return 'bg-snow';
    }
    if (codId >= 500 && codId <= 531) {
      return 'bg-rain';
    }
    if (codId >= 200 && codId <= 232) {
      return 'bg-thunder';
    }
    if (codId >= 300 && codId <= 321) {
      return 'bg-rainy';
    }
    return 'bg-rainy';
  };

  return (
    <>
      <section className={'app ' + getBackClassName()}>
        <div className="container">
          <SearchCity onSerachWeather={onSerachWeather} />
          <MainWidget
            selectedWeather={selectedWeather}
            onDeleteWeather={onDeleteWeather}
            onSetDefualtWeather={onSetDefualtWeather}
          />
          <WidgetList
            weatherList={weatherList}
            changeWeatherDetail={changeWeatherDetail}
          />
        </div>
      </section>
    </>
  );
}

HomePage.propTypes = {
  // weatherList: PropTypes.array,
  selectedWeather: PropTypes.object,
  fetchWeatherDetail: PropTypes.func,
  setSelectedWeatherDetail: PropTypes.func,
  updateWeatherList: PropTypes.func,
};

const mapStateToProps = (state) => ({
  weatherList: state.weathers.weatherList,
  isLoading: state.weathers.detailIsLoading,
  selectedWeather: state.weathers.selectedWeather,
});

const mapDispatchToProps = {
  fetchWeatherDetail,
  setSelectedWeatherDetail,
  updateWeatherList,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
