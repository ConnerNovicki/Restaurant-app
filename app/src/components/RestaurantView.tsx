import React from 'react'
import { Card, Icon } from 'antd';
import { Link } from 'react-router-dom';

const getUserActions = (user, restaurantId): React.ReactNode[] => {
  if (!user) {
    return [];
  }

  const actions = {
    review: (
      <Link to={{ pathname: `/restaurants/${restaurantId}?action=review` }} >
        <div key="review">
          <Icon type="like" /> / <Icon type="dislike" />
        </div>
      </Link>
    ),
    edit: <Icon type="edit" key="edit" />,
    delete: <Icon type="delete" key="delete" />,
  }

  if (user.role === 'ADMIN') {
    return [actions.review, actions.edit, actions.delete]
  }

  return [actions.review];
}

const Restaurant = ({ user, restaurant }) => {
  return (
    <Card
      style={{
        maxWidth: '300px',
        width: '100%',
      }}
      actions={getUserActions(user, restaurant.id)}
    >
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      <p>Total Reviews: {restaurant.numReviews}</p>
      <p>Total Comments: {restaurant.numComments}</p>
    </Card>
  )
}

export default Restaurant
