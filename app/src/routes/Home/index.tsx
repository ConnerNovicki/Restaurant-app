import React, { useEffect, useContext } from 'react'
import { IStoreContext, StoreContext } from '../../lib/context';
import { Card, Icon } from 'antd';
import Meta from 'antd/lib/card/Meta';
import useApiClient from '../../lib/useApiClient';

const getUserActions = (user): React.ReactNode[] => {
  if (!user) {
    return [];
  }

  const actions = {
    review: <div key="review"><Icon type="like" /> / <Icon type="dislike" /></div>,
    edit: <Icon type="edit" key="edit" />,
    delete: <Icon type="delete" key="delete" />,
  }

  if (user.role === 'ADMIN') {
    return [actions.review, actions.edit, actions.delete]
  }

  return [actions.review];
}

const Home = () => {
  const apiClient = useApiClient();
  const { state } = useContext<IStoreContext>(StoreContext);
  useEffect(() => {
    apiClient.fetchAllRestaurants();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      Restaurants:
      {state.restaurants.map(restaurant => (
        <div>
          <Card
            style={{
              maxWidth: '300px',
              width: '100%',
            }}
            actions={getUserActions(state.user)}
          >
            <Meta
              avatar={<Icon type="setting" />}
              title={restaurant.name}
              description="This is the description"
            />
          </Card>
        </div>
      ))}
    </div>
  )
}

export default Home
