import React, { useState } from 'react'
import { Input, Button, Card, Form, message } from 'antd';
import api from '../../lib/api'
import { withRouter } from 'react-router-dom';

const Login = ({ setIsCreating, history }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    api.login({ username, password })
      .then((res) => {
        if (res.user.role === 'OWNER') {
          history.push('/owner');
        } else {
          history.push('/home');
        }
       })
      .catch((err) => message.error(err.message))
  }

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Form onSubmit={handleOnSubmit}>
          <h2>Welcome to the Restaurants App!</h2>
          <label>User name</label>
          <Input value={username} onChange={e => setUsername(e.target.value)} />
          <label>Password</label>
          <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
          <Button htmlType="submit">Login</Button>
        </Form>
        <Button type="link" onClick={setIsCreating}>Don't have an account?</Button>
      </div>
    </Card>
  )
}

// @ts-ignore
export default withRouter(Login);
