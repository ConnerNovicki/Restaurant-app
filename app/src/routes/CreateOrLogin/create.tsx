import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import api from '../../lib/api'
import { withRouter } from 'react-router-dom';

const CreateAccount = ({ history, setIsCreating }) => {
  const [role, setRole] = useState<string>('OWNER');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleOnSubmit = (evt) => {
    evt.preventDefault()

    api.createUser({ username, role })
      .then((res) => {
        if (res.user.role === 'OWNER') {
          history.push('/owner');
        } else {
          history.push('/home');
        }
      })
      .catch(err => message.error(err.message));
  }

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <h2>Create an account</h2>
        <Input value={role} onChange={e => setRole(e.target.value)} />
        <Input value={username} onChange={e => setUsername(e.target.value)} />
        <Input value={password} onChange={e => setPassword(e.target.value)} />
        <Input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <Button htmlType="submit">Submit!</Button>
      </Form>
      <Button type="link" onClick={setIsCreating}>Back to login</Button>
    </div>
  )
}

// @ts-ignore
export default withRouter(CreateAccount);
