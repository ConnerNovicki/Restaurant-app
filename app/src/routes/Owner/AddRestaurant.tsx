import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import useApiClient from '../../lib/useApiClient';

const AddRestaurant = ({ onClose }) => {
  const apiClient = useApiClient();
  const [name, setName] = useState('');

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    apiClient.addUserRestaurant({ name })
      .then(() => {
        apiClient.fetchUserRestaurants();
        setName('');
        onClose();
      });
  }

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <label>Name:</label>
        <Input value={name} onChange={e => setName(e.target.value)} />
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default AddRestaurant
