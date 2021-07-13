const env = process.env.REACT_APP_STAGE;

const apiEnvironment = {
  localhost: {
    api: 'https://api.openweathermap.org/data/2.5/weather',
    apiKey: '92cbf3ec4013975f428f589873361dfb',
    cityApi:
      'http://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
    cityApiKey: 'MaUsOh7X6wRpmgZv9WnPSBXxb9q0lTBG',
  },
  development: {
    api: 'https://api.openweathermap.org/data/2.5/weather',
    apiKey: '92cbf3ec4013975f428f589873361dfb',
    cityApi:
      'http://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
    cityApiKey: 'MaUsOh7X6wRpmgZv9WnPSBXxb9q0lTBG',
  },
};

module.exports = apiEnvironment[env];