import React, { ReactElement, useEffect } from 'react'
import { Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';

interface Props {
  form: FormComponentProps['form'];
  fieldName: string;
  name: string;
  component: ReactElement;
  defaultValue?: any;
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
  defaultValue,
}: Props) => {
  useEffect(() => {
    if (!!defaultValue) {
      form.setFieldsValue({ [fieldName]: defaultValue })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
