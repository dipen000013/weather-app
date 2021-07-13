/* eslint-disable no-sequences */
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from '../api/api';

import { setGlogalLoader } from '../redux/actions/weatherActions';

const useAxiosLoader = (isGlobalLoading) => {
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();

  const inc = useCallback(() => setCounter((counterInc) => counterInc + 1), [
    setCounter,
  ]);
  const dec = useCallback(() => setCounter((counterDec) => counterDec - 1), [
    setCounter,
  ]);

  const interceptors = useMemo(
    () => ({
      request: (config) => (inc(), config),
      response: (response) => (dec(), response),
      error: (error) => (dec(), Promise.reject(error)),
    }),
    [inc, dec],
  );

  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use(
      interceptors.request,
      interceptors.error,
    );
    const resInterceptor = axios.interceptors.response.use(
      interceptors.response,
      interceptors.error,
    );
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);

  useEffect(() => {
    if (isGlobalLoading && !counter > 0) {
      dispatch(setGlogalLoader(false));
    }
  }, [counter]);

  return [counter > 0];
};

function Loader(props) {
  const { isGlobalLoading } = props;  
  const [loading] = useAxiosLoader(isGlobalLoading);

  return (
    <div>
      {loading || isGlobalLoading ? (
        <div className="app-loader">
          <CircularProgress size={100} thickness={2} />
        </div>
      ) : null}
    </div>
  );
}

Loader.propTypes = {
  isGlobalLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isGlobalLoading: state.weathers.isGlobalLoading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
