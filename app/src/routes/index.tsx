import React, { useEffect } from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom';
import CreateOrLogin from './CreateOrLogin'
import Home from './Home';
import Owner from './Owner'
import LogoutButton from '../components/LogoutButton';
import useApiClient from '../lib/useApiClient';

const Routes = () => {
  const apiClient = useApiClient();
  useEffect(() => {
    apiClient.fetchUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
