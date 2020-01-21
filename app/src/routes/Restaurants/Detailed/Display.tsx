import React, { useState } from 'react'
import { GetRestaurantByIdResult } from '../../../../../api/Shared/restTypes'
import { Button } from 'antd';
import CreateReviewModal from './CreateReviewModal'
import DeleteRestaurantButton from '../../../components/DeleteRestaurantButton'
import ReviewDisplay from './ReviewDisplay';

interface Props {
  restaurantDetailed: GetRestaurantByIdResult;
}

const RestaurantDetailedDisplay = ({ restaurantDetailed }: Props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const displayedReviews = restaurantDetailed.reviews.slice(0, 3);

  return (
    <div>
      <h2>{restaurantDetailed.name}</h2>
      <h3>{restaurantDetailed.description}</h3>
      {displayedReviews.map(review => (
        <ReviewDisplay review={review} restaurantId={restaurantDetailed.id} />
      ))}
      <Button onClick={() => setIsAddingComment(true)}>Add Review</Button>
      {isAddingComment && (
        <CreateReviewModal
          restaurantDetailed={restaurantDetailed}
          setIsVisible={setIsAddingComment}
        />)}
      <DeleteRestaurantButton restaurantId={restaurantDetailed.id} />
    </div>
  )
}

export default RestaurantDetailedDisplay;
