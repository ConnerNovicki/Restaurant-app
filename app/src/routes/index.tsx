import React, { useContext } from 'react'
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
import Admin from './Admin';
import { IStoreContext, StoreContext } from '../lib/context';

const WithLayout = ({ children }) => {
  const { state: { user } } = useContext<IStoreContext>(StoreContext);
  return (
    <Layout>
      <Layout.Header>
        <div style={{ display: 'flex' }}>
          <h2>Role: {user.role}</h2>
          {user.role === 'ADMIN' && (
            <Button icon="settings">
              <Link to="/admin">Admin</Link>
            </Button>
          )}
          {user.role === 'OWNER' && (
            <Button type="link">
              <Link to="/owner">Owned Restaurants</Link>
            </Button>
          )}
          <Button type="link">
            <Link to="/restaurants">Home</Link>
          </Button>
          <LogoutButton />
        </div>
      </Layout.Header>
      <Layout.Content>
        {children}
      </Layout.Content>
    </Layout>
  )
}

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
      <AuthenticatedRoute path="/admin" allowed={['ADMIN']} redirectTo="/restaurants">
        <WithLayout>
          <Admin />
        </WithLayout>
      </AuthenticatedRoute>
      <Route path="/login">
        <CreateOrLogin />
      </Route>
    </Switch>
  )
}

export default Routes
