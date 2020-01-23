import React, { useEffect, useContext } from 'react'
import useApiClient from '../../lib/useApiClient'
import { IStoreContext, StoreContext } from '../../lib/context';
import { Button } from 'antd';

const RestaurantExpanded = ({ restaurantId }) => {
  const apiClient = useApiClient();
  const { state } = useContext<IStoreContext>(StoreContext);

  useEffect(() => {
    if (!state.restaurantsById[restaurantId]) {
      apiClient.fetchRestaurantById({ id: restaurantId })
    }
  }, [])

  const handleDeleteReview = (reviewId: string) => {
    apiClient.deleteReview(reviewId)
      .then(() => apiClient.fetchRestaurantById({ id: restaurantId }))
  }

  const handleDeleteComment = (commentId: string) => {
    apiClient.deleteComment(commentId)
      .then(() => apiClient.fetchRestaurantById({ id: restaurantId }))
  }

  const restaurant = state.restaurantsById[restaurantId];
  if (!restaurant) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>EXPANDED {restaurant.name}</h2>
      {restaurant.reviews.map((review) => (
        <div>
          <h2>{review.id}</h2>
          <p>{review.author.username}</p>
          <p>{review.rating}</p>
          {review.comments.map(comment => (
            <div>
              <p>{comment.text}</p>
              <Button type="danger" onClick={() => handleDeleteComment(comment.id)}>Delete comment</Button>
            </div>
          ))}
          <Button type="danger" onClick={() => handleDeleteReview(review.id)}>Delete review</Button>
        </div>
      ))}
    </div>
  )
}

export default RestaurantExpanded
