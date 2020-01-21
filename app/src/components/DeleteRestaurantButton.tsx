import React, { useContext } from 'react'
import useApiClient from '../lib/useApiClient'
import { Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import useUserOwnsRestaurant from '../lib/useUserOwnsRestaurant'
import { IStoreContext, StoreContext } from '../lib/context';

const DeleteRestaurantButton = ({ restaurantId }) => {
  const userOwnsRestaurant = useUserOwnsRestaurant({ restaurantId });
  const { state: { user } } = useContext<IStoreContext>(StoreContext);
  const apiClient = useApiClient();
  const history = useHistory();

  const handleOnClick = () => {
    apiClient.deleteRestaurant(restaurantId)
      .then(() => history.push('/restaurants'))
      .catch(err => message.error(err.message));
  }

  return userOwnsRestaurant || (user && user.role === 'ADMIN')
    ? <Button type="danger" onClick={handleOnClick}>Delete Restaurant</Button>
    : <></>
}

export default DeleteRestaurantButton
