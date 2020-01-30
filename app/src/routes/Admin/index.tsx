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

  const handleEditUser = (userId: string, values) => {
    apiClient.editUser(userId, values)
      .then(() => {
        apiClient.fetchAllUsers()
        apiClient.fetchAllRestaurants();
      })
  }

  const handleEditRestaurant = (restaurantId: string, values) => {
    apiClient.editRestaurant(restaurantId, values)
      .then(() => {
        apiClient.fetchAllUsers()
        apiClient.fetchAllRestaurants();
      })
  }

  return (
    <Block>
      <div>
        <h1>Users:</h1>
        <Table
          dataSource={state.allUsers}
          columns={[
            { title: 'Username', dataIndex: 'username' },
            { title: 'Created at', dataIndex: 'createdAt' },
            { title: 'Role', dataIndex: 'role' },
            { render: (_, { id }) => <Button onClick={() => handleDeleteUser(id)}>Delete</Button> },
            {
              render: (_, user) => (
                <Button
                  onClick={() => setEditModalConfig({
                    onSubmit: (values) => handleEditUser(user.id, values),
                    fields: [
                      {
                        fieldName: 'role',
                        name: 'Role',
                        defaultValue: user.role,
                        type: 'Role'
                      },
                      {
                        fieldName: 'username',
                        name: 'User Name',
                        defaultValue: user.username
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
            { title: 'Name', dataIndex: 'name' },
            { title: 'Description', dataIndex: 'description' },
            { title: 'Average Rating', dataIndex: 'averageRating' },
            { title: 'Comments', dataIndex: 'numComments' },
            { render: (_, { id }) => <Button onClick={() => handleDeleteRestaurant(id)}>Delete</Button> },
            {
              render: (_, restaurant) => (
                <Button
                  onClick={() => setEditModalConfig({
                    onSubmit: (values) => handleEditRestaurant(restaurant.id, values),
                    fields: [
                      {
                        fieldName: 'description',
                        name: 'Description',
                        defaultValue: restaurant.description
                      },
                      {
                        fieldName: 'name',
                        name: 'Name',
                        defaultValue: restaurant.name
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
