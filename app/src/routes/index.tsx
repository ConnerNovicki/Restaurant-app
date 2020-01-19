import React from 'react'
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import CreateOrLogin from './CreateOrLogin'
import Restaurants from './Restaurants/Main';
import RestaurantDetailed from './Restaurants/Detailed';
import Owner from './Owner'
import LogoutButton from '../components/LogoutButton';
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import { Layout, Button } from 'antd';

const WithLayout = ({ children }) => (
  <Layout>
    <Layout.Header>
      <Button type="link"><Link to="/restaurants">Home</Link></Button>
      <LogoutButton />
      </Layout.Header>
    <Layout.Content>
      {children}
    </Layout.Content>
  </Layout>
)

const Routes = () => {
  return (
    <Switch>
      <AuthenticatedRoute path="/owner" allowed={['OWNER']} redirectTo="/home">
        <WithLayout>
          <Owner />
        </WithLayout>
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/restaurants/:id" allowed={['OWNER', 'USER', 'ADMIN']} redirectTo="/login">
        <WithLayout>
          <RestaurantDetailed />
        </WithLayout>
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/restaurants" allowed={['OWNER', 'USER', 'ADMIN']} redirectTo="/login">
        <WithLayout>
          <Restaurants />
        </WithLayout>
      </AuthenticatedRoute>
      <Route path="/login">
        <CreateOrLogin />
      </Route>
    </Switch>
  )
}

export default Routes
