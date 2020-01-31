import React from 'react'
import { GetUserPendingReviews } from '../../../generated/restTypes'
import ReviewDisplay from '../Restaurants/Detailed/ReviewDisplay'

interface Props {
  pendingReviews: GetUserPendingReviews;
}

const PendingReviewsDisplay = ({ pendingReviews }: Props) => {
  return pendingReviews.length
    ? (
      <div>
        <h3>Pending Reviews:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {pendingReviews.map(review => (
            <div>
              <h4>Restaurant: {review.restaurant.name}</h4>
              <ReviewDisplay review={review} restaurantId={review.restaurant.id} />
            </div>
          ))}
        </div>
      </div>
    )
    : <></>
}

export default PendingReviewsDisplay
