import React, { useState, useContext } from 'react'
import { Form, Input, Button } from 'antd'
import api from '../../lib/api';
import { IStoreContext, StoreContext } from '../../lib/context';
import { Actions } from '../../lib/actions';

const AddRestaurant = ({ onClose }) => {
  const { dispatch } = useContext<IStoreContext>(StoreContext);
  const [name, setName] = useState('');

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    api.addUserRestaurant({ name })
      .then((res) => {
        api.userRestaurants().then((res) => {
          dispatch(Actions.saveUserRestaurants(res))
        })

        setName('');
        onClose();
      })
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
