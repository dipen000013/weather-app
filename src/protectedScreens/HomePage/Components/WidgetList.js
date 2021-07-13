import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

import { getWeatherIconName } from '../../../utils/functions';

function WidgetList(props) {
  const { weatherList, changeWeatherDetail } = props;

  const setWeatherForMainWidget = (selectedWeather) => {
    changeWeatherDetail(selectedWeather);
  };

  return (
    <>
      <Row>
        {weatherList &&
          weatherList.map((list) => (
            <Col sm="4" md="3" className="mb-4" key={list.id}>
              <Card className="weather-info-card-mini">
                <CardBody
                  className="card-body"
                  onClick={() => {
                    setWeatherForMainWidget(list);
                  }}
                >
                  <div className="icon">
                    <img
                      className="img-fluid weather"
                      src={`assets/icons/${getWeatherIconName(list)}.svg`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'assets/icons/Clouds.svg';
                      }}
                      alt="icon"
                    />
                  </div>
                  <div className="info">
                    <div className="city">{list?.name}</div>
                    <div className="degree">
                      {list?.main.temp} <sup>o</sup>C
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}

export default WidgetList;
