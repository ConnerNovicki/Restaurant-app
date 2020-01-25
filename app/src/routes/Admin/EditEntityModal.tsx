import React from 'react'
import WrappedFormItem from '../../components/WrappedFormItem';
import { Input, Modal, Button, DatePicker, Slider } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';

export interface Field {
  name: string;
  fieldName: string;
  type?: 'Input' | 'DatePicker' | 'RatingSlider';
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
        {fields.map(({ fieldName, type, name }) => {
          const formComponent = (() => {
            switch (type) {
              case 'DatePicker':
                return <DatePicker />;
              case 'RatingSlider':
                return <Slider />
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
            />
          )
        })}
        <Button htmlType="submit">Submit</Button>
      </Form>
    </Modal>
  )
}

export default Form.create<Props>()(EditEntityModal);
