import React from 'react'
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

const SelectRole = (selectProps: SelectProps) => {
  return (
    <Select {...selectProps}>
      <Select.Option value="USER">User</Select.Option>
      <Select.Option value="OWNER">Owner</Select.Option>
      <Select.Option value="ADMIN">Admin</Select.Option>
    </Select>
  )
}

export default SelectRole
