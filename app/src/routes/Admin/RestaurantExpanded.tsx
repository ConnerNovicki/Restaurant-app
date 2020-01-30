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

  const handleEditReview = (reviewId: string, values) => {
    apiClient.editReview(reviewId, values)
      .then(() => apiClient.fetchRestaurantById({ id: restaurantId }))
  }

  const handleEditComment = (commentId: string, values) => {
    apiClient.editComment(commentId, values)
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
        <Card style={{ margin: '0 0 1rem 0' }}>
          <h4>Username: {review.author.username}</h4>
          <p>Author: {review.author.username}</p>
          <p>Rating: {review.rating}</p>
          <p>Date of visit: {review.dateOfVisit}</p>
          <p>Created at: {review.createdAt}</p>
          <Button type="danger" onClick={() => handleDeleteReview(review.id)}>Delete review</Button>
          <Button type="default" onClick={() => onEdit({
            onSubmit: (values) => handleEditReview(review.id, values),
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
            <Card style={{ margin: '1rem 0' }}>
              <h4>Author: {comment.author.username}</h4>
              <h5>Time: {comment.updatedAt}</h5>
              <p>Text: {comment.text}</p>
              <Button type="danger" onClick={() => handleDeleteComment(comment.id)}>Delete comment</Button>
              <Button type="default" onClick={() => onEdit({
                onSubmit: (values) => handleEditComment(comment.id, values),
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
