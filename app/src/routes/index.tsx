import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom';
import CreateOrLogin from './CreateOrLogin'
import Home from './Home';
import Owner from './Owner'
import LogoutButton from '../components/LogoutButton';

const Routes = () => {
  return (
    <Switch>
      <Route path="/owner">
        <Owner />
        <LogoutButton />
      </Route>
      <Route path="/home">
        <Home />
        <LogoutButton />
      </Route>
      <Route path="/">
        <CreateOrLogin />
      </Route>
    </Switch>
  )
}

export default Routes
