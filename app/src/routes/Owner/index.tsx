import React, { useContext, useEffect, useState } from 'react'
import { IStoreContext, StoreContext } from '../../lib/context'
import { Button, Modal } from 'antd';
import AddRestaurant from './AddRestaurant';
import useApiClient from '../../lib/useApiClient';

const Owner = () => {
  const apiClient = useApiClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { state: { userRestaurants } } = useContext<IStoreContext>(StoreContext);

  useEffect(() => {
    apiClient.fetchUserRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <h2>Welcome Back Owner</h2>
        {!!userRestaurants.length
          ? (
            <div>
              {userRestaurants.map(restaurant => (
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