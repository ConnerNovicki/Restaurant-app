import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd';
import useApiClient from '../lib/useApiClient';
import { IStoreContext, StoreContext } from '../lib/context';
import { Actions } from '../lib/actions'

const LogoutButton = () => {
  const { dispatch } = useContext<IStoreContext>(StoreContext);
  const history = useHistory();

  const handleOnClick = () => {
    localStorage.removeItem('token');
    dispatch(Actions.clearStore());
    history.push('/login');
  }
  
  return (
    <Button onClick={handleOnClick}>Logout</Button>
  )
}

export default LogoutButton
