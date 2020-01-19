import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd';

const LogoutButton = () => {
  const history = useHistory();

  const handleOnClick = () => {
    localStorage.removeItem('token');
    history.push('/login');
  }
  
  return (
    <Button onClick={handleOnClick}>Logout</Button>
  )
}

export default LogoutButton
