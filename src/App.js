import React from 'react';
import { Router } from 'react-router-dom';
import AppRouter from './Router';
import { history } from './utils/history';

import './assets/css/bootstrap.scss';
import './assets/css/style.scss';
import './assets/css/comman.scss';
import './assets/css/media.scss';
function App() {
  return (
    <Router history={history}>
      <AppRouter />
    </Router>
  );
}

export default App;
