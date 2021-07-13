import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from 'reactstrap';

import DotIcon from '../../../assets/images/icons/dots.svg';
import HomeIcon from '../../../assets/images/icons/home.svg';
import DeleteIcon from '../../../assets/images/icons/delete.svg';

import { getWeatherIconName } from '../../../utils/functions';

function MainWidget(props) {
  const { selectedWeather, onDeleteWeather, onSetDefualtWeather } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const DisplayWeatherType = () => {
    if (selectedWeather?.weather?.length > 0) {
      return <span>{selectedWeather?.weather[0].main}</span>;
    }
    return <span></span>;
  };

  return (
    <>
      {selectedWeather?.name && (
        <Row>
          <Col xs="12" className="mb-4">
            <Card className="weather-info-card">
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle>
                  <img src={DotIcon} alt="More" />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    tag="a"
                    onClick={() => {
                      onSetDefualtWeather();
                    }}
                  >
                    <img className="img-fluid" src={HomeIcon} alt="Home" />
                    Set as home
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    onClick={() => {
                      onDeleteWeather();
                    }}
                  >
                    <img className="img-fluid" src={DeleteIcon} alt="Home" />
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <CardBody>
                <div className="icon">
                  <img
                    className="img-fluid weather"
                    src={`assets/icons/${getWeatherIconName(
                      selectedWeather,
                    )}.svg`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'assets/icons/Clouds.svg';
                    }}
                    alt="icon"
                  />
                </div>
                <div className="info">
                  <div className="city">{selectedWeather?.name}</div>
                  <div className="degree">
                    {selectedWeather?.main?.temp}
                    {' '}
                    <sup>o</sup>
                    C
                  </div>
                  <div className="status">
                    <DisplayWeatherType />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default MainWidget;
