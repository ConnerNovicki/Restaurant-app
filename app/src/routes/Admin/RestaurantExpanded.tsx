import React, { useEffect, useContext } from 'react'
import useApiClient from '../../lib/useApiClient'
import { IStoreContext, StoreContext } from '../../lib/context';
import { Button, Card } from 'antd';
import { EditModalState } from '.';

interface Props {
  restaurantId: string;
  onEdit: (config: EditModalState) => void;
}

const RestaurantExpanded = ({ restaurantId, onEdit }: Props) => {
  const apiClient = useApiClient();
  const { state } = useContext<IStoreContext>(StoreContext);

  useEffect(() => {
    if (!state.restaurantsById[restaurantId]) {
      apiClient.fetchRestaurantById({ id: restaurantId })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiClient, restaurantId, state.restaurantsById])

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
      <h2>{restaurant.name}</h2>
      {restaurant.reviews.map((review) => (
        <Card>
          <p>Username: {review.author.username}</p>
          <p>Rating: {review.rating}</p>
          <Button type="danger" onClick={() => handleDeleteReview(review.id)}>Delete review</Button>
          <Button type="default" onClick={() => onEdit({
            onSubmit: (values) => { apiClient.editReview(review.id, values) },
            fields: [
              {
                fieldName: 'dateOfVisit',
                name: 'Date Of Visit',
                type: 'DatePicker',
              },
              {
                fieldName: 'rating',
                name: 'Rating',
                type: 'Rating',
                defaultValue: review.rating
              },
            ]
          })}>Edit</Button>
          {review.comments.map(comment => (
            <Card>
              <p>{comment.text}</p>
              <Button type="danger" onClick={() => handleDeleteComment(comment.id)}>Delete comment</Button>
              <Button type="default" onClick={() => onEdit({
                onSubmit: (values) => { apiClient.editComment(comment.id, values) },
                fields: [
                  {
                    fieldName: 'text',
                    name: 'Text',
                    defaultValue: comment.text,
                  },
                ]
              })}>Edit</Button>
            </Card>
          ))}
        </Card>
      ))}
    </div>
  )
}

export default RestaurantExpanded
