import React, { useEffect, useContext, useState } from 'react'
import useApiClient from '../../lib/useApiClient'
import { IStoreContext, StoreContext } from '../../lib/context';
import { Table, Button, message } from 'antd';
import RestaurantExpanded from './RestaurantExpanded';
import EditEntityModal, { Field as EditEntityModalField } from './EditEntityModal';
import Block from '../../components/Block';

export interface EditModalState {
  fields: EditEntityModalField[];
  onSubmit: (values) => void;
}

const Admin = () => {
  const [editModalConfig, setEditModalConfig] = useState<EditModalState>(null);
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
    <Block>
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
            {
              render: (_, { id }) => (
                <Button
                  onClick={() => setEditModalConfig({
                    onSubmit: (values) => { apiClient.editUser(id, values) },
                    fields: [
                      {
                        fieldName: 'role',
                        name: 'Role',
                      },
                      {
                        fieldName: 'username',
                        name: 'User Name',
                      },
                    ]
                  })}
                >
                  Edit
              </Button>
              )
            },
          ]}
        />
        <h1>Restaurants:</h1>
        <Table
          dataSource={state.restaurants}
          expandedRowRender={(restaurant) => (
            <RestaurantExpanded
              restaurantId={restaurant.id}
              onEdit={(config) => setEditModalConfig(config)}
            />
          )}
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
            {
              render: (_, { id }) => (
                <Button
                  onClick={() => setEditModalConfig({
                    onSubmit: (values) => { apiClient.editRestaurant(id, values) },
                    fields: [
                      {
                        fieldName: 'description',
                        name: 'Description',
                      },
                      {
                        fieldName: 'name',
                        name: 'Name',
                      },
                    ]
                  })}
                >
                  Edit
              </Button>
              )
            },
          ]}
        />
      </div>
      {!!editModalConfig && (
        <EditEntityModal
          fields={editModalConfig.fields}
          onSubmit={editModalConfig.onSubmit}
          onClose={() => setEditModalConfig(null)}
        />)}
    </Block>
  )
}

export default Admin
