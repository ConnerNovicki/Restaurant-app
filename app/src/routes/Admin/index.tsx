import React, { useEffect, useContext } from 'react'
import useApiClient from '../../lib/useApiClient'
import { IStoreContext, StoreContext } from '../../lib/context';
import { Table, Button, message } from 'antd';

const Admin = () => {
  const apiClient = useApiClient();
  const { state } = useContext<IStoreContext>(StoreContext);
  useEffect(() => {
    apiClient.fetchAllUsers()
    apiClient.fetchAllRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteUser = (userId: string) => {
    apiClient.deleteUser(userId)
      .then(() => {
        apiClient.fetchAllUsers()
        apiClient.fetchAllRestaurants();
      })
      .catch(err => message.error(err.message));
  }

  const handleDeleteRestaurant = (restaurantId: string) => {
    apiClient.deleteRestaurant(restaurantId)
      .then(() => {
        apiClient.fetchAllUsers()
        apiClient.fetchAllRestaurants();
      })
      .catch(err => message.error(err.message));
  }

  return (
    <div>
      <h1>Users:</h1>
      <Table
        dataSource={state.allUsers}
        columns={[
          {
            render: (_, { username }) => <span>{username}</span>
          },
          {
            render: (_, { id }) => <span>{id}</span>
          },
          {
            render: (_, { id }) => <Button onClick={() => handleDeleteUser(id)}>Delete</Button>
          },
        ]}
      />
      <h1>Restaurants:</h1>
      <Table
        dataSource={state.restaurants}
        columns={[
          {
            render: (_, { name }) => <span>{name}</span>
          },
          {
            render: (_, { id }) => <span>{id}</span>
          },
          {
            render: (_, { id }) => <Button onClick={() => handleDeleteRestaurant(id)}>Delete</Button>
          },
        ]}
      />
    </div>
  )
}

export default Admin
