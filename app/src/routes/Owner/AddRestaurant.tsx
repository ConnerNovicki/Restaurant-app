import React from 'react'
import { Form, Input, Button } from 'antd'
import useApiClient from '../../lib/useApiClient';
import WrappedFormItem from '../../components/FormComponents/WrappedFormItem';
import { FormComponentProps } from 'antd/lib/form';

interface FormProps {
  name: string;
  description: string;
}

interface Props {
  onClose: () => void;
  form: FormComponentProps<FormProps>['form'];
}

const AddRestaurant = ({ onClose, form }: Props) => {
  const apiClient = useApiClient();

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    form.validateFields((err, values) => {
      if (err) return;

      const { name, description } = values;
      apiClient.addUserRestaurant({ name, description })
        .then(() => {
          apiClient.fetchUserRestaurants();
          onClose();
        });

    })
  }

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <WrappedFormItem
          form={form}
          name="Name"
          fieldName="name"
          required
          component={<Input />}
        />
        <WrappedFormItem
          form={form}
          name="Description"
          fieldName="description"
          required
          component={<Input placeholder="Short summary: what type of food and atmostphere?" />}
        />
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default Form.create<Props>()(AddRestaurant);
