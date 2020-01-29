import React from 'react'
import WrappedFormItem from '../../components/WrappedFormItem';
import { Input, Modal, Button, DatePicker, Select, Rate } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';

export interface Field {
  name: string;
  fieldName: string;
  defaultValue?: any;
  type?: 'Input' | 'DatePicker' | 'Rating' | 'Role';
}

interface Props {
  fields: Field[];
  form: FormComponentProps['form']
  onSubmit: (values) => void;
  onClose: () => void;
}

const EditEntityModal = ({ fields, form, onSubmit, onClose }: Props) => {
  const handleOnSubmit = (evt) => {
    evt.preventDefault()

    form.validateFields((err, values) => {
      if (err) return;

      onClose();
      onSubmit(values);
    })
  }

  return (
    <Modal visible onCancel={onClose} footer={null}>
      <Form onSubmit={handleOnSubmit}>
        {fields.map(({ fieldName, type, name, defaultValue }) => {
          const formComponent = (() => {
            switch (type) {
              case 'DatePicker':
                return <DatePicker />;
              case 'Rating':
                console.log(defaultValue)
                return <Rate />
              case 'Role':
                return (
                  <Select>
                    <Select.Option value="USER">User</Select.Option>
                    <Select.Option value="OWNER">Owner</Select.Option>
                    <Select.Option value="ADMIN">Admin</Select.Option>
                  </Select>
                )
              case 'Input':
              default:
                return <Input />
            }
          })()

          return (
            <WrappedFormItem
              form={form}
              fieldName={fieldName}
              name={name}
              component={formComponent}
              defaultValue={defaultValue}
            />
          )
        })}
        <Button htmlType="submit">Submit</Button>
      </Form>
    </Modal>
  )
}

export default Form.create<Props>()(EditEntityModal);
