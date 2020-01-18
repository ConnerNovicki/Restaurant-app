import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import CreateOrLogin from './CreateOrLogin'
import Home from './Home';
import Owner from './Owner'

const Routes = () => {
  return (
    <Switch>
      <Route path="/owner">
        <Owner />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/">
        <CreateOrLogin />
      </Route>
    </Switch>
  )
}

export default Routes
