import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import * as config from '../../../configs';

function SearchCity(props) {
  const { onSerachWeather } = props;
  const [isSearchClick, setSearchClick] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [cityOptions, setCityOptions] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const promiseOptions = (inputValue) =>
    new Promise((resolve, reject) => {
      setMenuOpen(true);
      if (!inputValue) {
        setSearchKeyword('');
      }
      setTimeout(() => {
        fetch(`${config.cityApi}?apikey=${config.cityApiKey}&q=${inputValue}`)
          .then((res) => res.json())
          .then(
            (result) => {
              const cityList = [];
              if (result?.length > 0) {
                result.filter((item) => {
                  cityList.push({
                    value: item.LocalizedName,
                    label: item.LocalizedName,
                  });
                });
                setCityOptions(cityList);
              }
              resolve(cityList);
            },
            () => {
              reject();
            },
          );
      }, 800);
    });

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    if (inputValue === '') {
      setSearchKeyword('');
      setMenuOpen(false);
    }
    return inputValue;
  };

  const handleChange = (selectedOption) => {
    setSearchKeyword(selectedOption);
  };

  const searchWeatherData = (e) => {
    if (e.key === 'Enter' && searchKeyword?.value) {
      onSerachWeather(searchKeyword?.value);
      setMenuOpen(false);
      setSearchKeyword('');
    }
  };

  return (
    <>
      {isSearchClick ? (
        <div className="search-city-input">
          <AsyncSelect
            loadOptions={promiseOptions}
            onInputChange={handleInputChange}
            onChange={handleChange}
            value={searchKeyword}
            menuIsOpen={isMenuOpen}
            onKeyDown={searchWeatherData}
          />
          {/* <input type="text" className="form-control" value={searchKeyword} /> */}
          <div className="info">
            <span>TAB</span> to cycle
          </div>
        </div>
      ) : (
        <div
          className="search-city-text"
          aria-hidden="true"
          onClick={() => setSearchClick(true)}
          role="button"
        >
          Click here to search
        </div>
      )}
    </>
  );
}

SearchCity.propTypes = {
  onSerachWeather: PropTypes.func,
};

export default SearchCity;
