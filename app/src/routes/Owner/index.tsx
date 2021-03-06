import React, { useContext, useEffect, useState } from 'react'
import { IStoreContext, StoreContext } from '../../lib/context'
import { Button, Modal } from 'antd';
import AddRestaurant from './AddRestaurant';
import useApiClient from '../../lib/useApiClient';
import RestaurantView from '../../components/RestaurantView'
import Block from '../../components/Block';
import PendingReviewsDisplay from './PendingReviewsDisplay';

const Owner = () => {
  const apiClient = useApiClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { state: { userRestaurants, user, userPendingReviews } } = useContext<IStoreContext>(StoreContext);

  useEffect(() => {
    apiClient.fetchUserRestaurants();
    apiClient.fetchUserPendingReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Block>
      <PendingReviewsDisplay pendingReviews={userPendingReviews} />
      <div>
        <h2>Welcome Back {user.username}</h2>
        {!!userRestaurants.length
          ? (
            <div>
              {userRestaurants.map(restaurant => (
                <RestaurantView restaurant={restaurant} />
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
    </Block>
  )
}

export default Owner
