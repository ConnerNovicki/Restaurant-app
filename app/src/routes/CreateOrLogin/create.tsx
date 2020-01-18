import React, { useState } from 'react'
import { Button, Form, Input, message, Select } from 'antd'
import api from '../../lib/api'
import { withRouter } from 'react-router-dom';

const CreateAccount = ({ history, setIsCreating }) => {
  const [role, setRole] = useState<string>('USER');
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
        <label>Role</label>
        <Select value={role} onChange={v => setRole(v)}>
          <Select.Option value="USER">User</Select.Option>
          <Select.Option value="OWNER">Owner</Select.Option>
          <Select.Option value="ADMIN">Admin</Select.Option>
        </Select>
        <label>User name</label>
        <Input value={username} onChange={e => setUsername(e.target.value)} />
        <label>Password</label>
        <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
        <label>Re-type Password</label>
        <Input.Password value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <Button htmlType="submit">Create Account</Button>
      </Form>
      <Button type="link" onClick={setIsCreating}>Back to login</Button>
    </div>
  )
}

// @ts-ignore
export default withRouter(CreateAccount);
