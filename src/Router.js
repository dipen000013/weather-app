import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NoContentPage from './screens/NoContentPage';
import HomePage from './protectedScreens/HomePage';
import Loader from './sharedComponents/Loader';

function AppRouter() {

  return (
    <main>
      <Loader />
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="*">
          <NoContentPage />
        </Route>
      </Switch>
    </main>
  );
}

export default AppRouter;
