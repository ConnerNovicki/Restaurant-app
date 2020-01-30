import React from 'react'
import { Row, Button, Form, Input, message } from 'antd'
import useApiClient from '../../lib/useApiClient';
import WrappedFormItem from '../../components/FormComponents/WrappedFormItem';
import { FormComponentProps } from 'antd/lib/form';
import SelectRole from '../../components/FormComponents/SelectRole'

interface Props {
  setIsCreating: () => void;
  form: FormComponentProps['form']
}

const CreateAccount = ({ setIsCreating, form }: Props) => {
  const apiClient = useApiClient();

  const handleOnSubmit = (evt) => {
    evt.preventDefault()

    form.validateFields((err, values) => {
      if (err) return;

      const { username, role, password } = values;

      apiClient.createUser({ username, role, password })
        .catch(err => message.error('We cannot create an account at this time.'));
    })
  }

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <h2>Create an account</h2>
        <WrappedFormItem
          form={form}
          fieldName="role"
          name="Role"
          required
          component={(<SelectRole />)}
        />
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
          <Button htmlType="submit">Create Account</Button>
          <Button type="link" onClick={setIsCreating}>Back to login</Button>
        </Row>
      </Form>
    </div>
  )
}

export default Form.create<Props>()(CreateAccount);
