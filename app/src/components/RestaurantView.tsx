import React from 'react'
import { Card } from 'antd';
import { useHistory } from 'react-router-dom';
import { GetRestaurantsResult } from '../../../api/Shared/restTypes';

// const getUserActions = (user, restaurantId): React.ReactNode[] => {
//   if (!user) {
//     return [];
//   }

//   const actions = {
//     review: (
//       <Link to={{ pathname: `/restaurants/${restaurantId}?action=review` }} >
//         <div key="review">
//           <Icon type="like" /> / <Icon type="dislike" />
//         </div>
//       </Link>
//     ),
//     edit: <Icon type="edit" key="edit" />,
//     delete: <Icon type="delete" key="delete" />,
//   }

//   if (user.role === 'ADMIN') {
//     return [actions.review, actions.edit, actions.delete]
//   }

//   return [actions.review];
// }

const Restaurant = ({ restaurant }) => {
  const history = useHistory();
  return (
    <Card
      onClick={() => history.push(`/restaurants/${restaurant.id}`)}
      style={{
        maxWidth: '300px',
        width: '100%',
        cursor: 'pointer',
      }}
    >
      <h2>{restaurant.name}</h2>
      <h4>Average Rating: {restaurant.averageRating}</h4>
      <p>{restaurant.description}</p>
      <p>Total Reviews: {restaurant.numReviews}</p>
      <p>Total Comments: {restaurant.numComments}</p>
    </Card>
  )
}

export default Restaurant
