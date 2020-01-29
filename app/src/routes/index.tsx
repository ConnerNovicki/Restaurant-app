import React, { useContext } from 'react'
import {
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import CreateOrLogin from './CreateOrLogin'
import Restaurants from './Restaurants/Main';
import RestaurantDetailed from './Restaurants/Detailed';
import Owner from './Owner'
import LogoutButton from '../components/LogoutButton';
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import { Layout, Menu } from 'antd';
import Admin from './Admin';
import { IStoreContext, StoreContext } from '../lib/context';

const WithLayout = ({ children, selectedKey }) => {
  const { state: { user } } = useContext<IStoreContext>(StoreContext);
  return (
    <Layout>
      <Layout.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Menu
          mode="horizontal"
          theme="dark"
          defaultSelectedKeys={[selectedKey]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">
            <Link to="/restaurants">Home</Link>
          </Menu.Item>
          {user.role === 'OWNER' && (
            <Menu.Item key="2">
              <Link to="/owner">Owned Restaurants</Link>
            </Menu.Item>
          )}
          {user.role === 'ADMIN' && (
            <Menu.Item key="3">
              <Link to="/admin">Admin</Link>
            </Menu.Item>
          )}
        </Menu>
        <LogoutButton />
      </Layout.Header>
      <Layout.Content style={{ minHeight: '100vh', padding: '2rem 0' }}>
        {children}
      </Layout.Content>
    </Layout>
  )
}

const Routes = () => {
  return (
    <Switch>
      <AuthenticatedRoute path="/restaurants/:id" allowed={['OWNER', 'USER', 'ADMIN']} redirectTo="/login">
        <WithLayout selectedKey="1">
          <RestaurantDetailed />
        </WithLayout>
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/restaurants" allowed={['OWNER', 'USER', 'ADMIN']} redirectTo="/login">
        <WithLayout selectedKey="1">
          <Restaurants />
        </WithLayout>
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/owner" allowed={['OWNER']} redirectTo="/home">
        <WithLayout selectedKey="2">
          <Owner />
        </WithLayout>
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/admin" allowed={['ADMIN']} redirectTo="/restaurants">
        <WithLayout selectedKey="3">
          <Admin />
        </WithLayout>
      </AuthenticatedRoute>
      <Route path="/login">
        <CreateOrLogin />
      </Route>
      <Route path="*">
        <Redirect to={{ pathname: '/login' }} />
      </Route>
    </Switch>
  )
}

export default Routes
