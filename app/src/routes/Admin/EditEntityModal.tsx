import React from 'react'
import WrappedFormItem from '../../components/FormComponents/WrappedFormItem';
import { Input, Modal, Button, DatePicker, Rate } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import SelectRole from '../../components/FormComponents/SelectRole';

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
                return <Rate />
              case 'Role':
                return <SelectRole />
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
