import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from './Navigation';

const AppRouter = (props) => {
  return (
    <Router>
      {props.isLoggedIn && <Navigation userObj={props.userObj} />}
      <Switch>
        {props.isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={props.userObj}></Home>
            </Route>
            <Route exact path="/profile">
              <Profile userObj={props.userObj} refreshUser={props.refreshUser}></Profile>
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth></Auth>
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
