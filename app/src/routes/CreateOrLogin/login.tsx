import React from 'react'
import { Input, Button, Form, message, Row } from 'antd';
import useApiClient from '../../lib/useApiClient';
import WrappedFormItem from '../../components/FormComponents/WrappedFormItem';
import { FormComponentProps } from 'antd/lib/form';

interface Props {
  form: FormComponentProps['form'];
  setIsCreating: () => void;
}

const Login = ({ setIsCreating, form }: Props) => {
  const apiClient = useApiClient();

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    form.validateFields((err, values) => {
      if (err) return;

      const { username, password } = values;

      apiClient.login({ username, password })
        .catch((err) => message.error('We cannot log you in at this time.'))
    })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <h2>Welcome to the Restaurants App!</h2>
      <Form onSubmit={handleOnSubmit}>
        <WrappedFormItem
          form={form}
          fieldName="username"
          name="User Name"
          required
          component={<Input />}
        />
        <WrappedFormItem
          form={form}
          fieldName="password"
          name="Password"
          required
          component={<Input.Password />}
        />
        <Row className="footer-container">
          <Button htmlType="submit">Login</Button>
          <Button type="link" onClick={setIsCreating}>Don't have an account?</Button>
        </Row>
      </Form>
    </div>
  )
}

export default Form.create<Props>()(Login);
