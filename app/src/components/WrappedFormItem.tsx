import React, { ReactElement } from 'react'
import { Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';

interface Props {
  form: FormComponentProps['form'];
  fieldName: string;
  name: string;
  component: ReactElement;
  required?: boolean;
  options?: GetFieldDecoratorOptions;
}

const WrappedFormItem = ({ 
  form,
  name,
  fieldName,
  required = false,
  component,
  options,
}: Props) => {
  const fieldOptions: GetFieldDecoratorOptions = required
    ? {
      ...(options || {}),
      rules: [
        ...((options && options.rules) || []),
        {
          required: true,
          message: `${name} is a required field`,
        },
      ],
    }
    : options;

  return (
    <Form.Item>
      <h4>{name}</h4>
      {form.getFieldDecorator(fieldName, fieldOptions)(
        component
      )}
    </Form.Item>
  )
}

export default WrappedFormItem;
