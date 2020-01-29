import React, { useState } from 'react'
import { Input, Button, Form, message, Row } from 'antd';
import useApiClient from '../../lib/useApiClient';

const Login = ({ setIsCreating }) => {
  const apiClient = useApiClient();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    apiClient.login({ username, password })
      .catch((err) => message.error(err.message))
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <Form onSubmit={handleOnSubmit}>
        <h2>Welcome to the Restaurants App!</h2>
        <label>User name</label>
        <Input value={username} onChange={e => setUsername(e.target.value)} />
        <label>Password</label>
        <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
        <Row className="footer-container">
          <Button htmlType="submit">Login</Button>
          <Button type="link" onClick={setIsCreating}>Don't have an account?</Button>
        </Row>
      </Form>
    </div>
  )
}

export default Login;
