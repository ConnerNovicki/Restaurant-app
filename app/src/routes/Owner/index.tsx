import React, { useContext, useEffect, useState } from 'react'
import { IStoreContext, StoreContext } from '../../lib/context'
import api from '../../lib/api';
import { Actions } from '../../lib/actions';
import { Button, Modal } from 'antd';
import AddRestaurant from './AddRestaurant';

interface Author {
  username: string;
}

interface Comment {
  id: string;
  author: Author;
}

interface RestaurantReview {
  id: string;
  author: Author;
  rating: number;
  comments: Comment[];
}

interface RestaurantDetailed {
  id: string;
  reviews: RestaurantReview[];
}

const Owner = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { state, dispatch } = useContext<IStoreContext>(StoreContext);
  
  useEffect(() => {
    api.userRestaurants().then((res) => {
      dispatch(Actions.saveUserRestaurants(res))
    })
  }, [dispatch]);

  return (
    <>
      <div>
        <h2>Welcome Back Owner</h2>
        {!!state.userRestaurants.length
          ? (
            <div>
              {state.userRestaurants.map(restaurant => (
                <div>{restaurant.name}</div>
              ))}
            </div>
          )
          : <div>You don't have any restaurants... try adding one!</div>
        }
        <Button onClick={() => setIsModalVisible(true)}>Add another!</Button>
      </div>
      <Modal
        onCancel={() => setIsModalVisible(false)}
        visible={isModalVisible}
        footer={null}
      >
        <div>Add new restaurant:</div>
        <AddRestaurant onClose={() => setIsModalVisible(false)} />
      </Modal>
    </>
  )
}

export default Owner
