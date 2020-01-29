import React from 'react'
import ReviewDisplay from './ReviewDisplay';
import './styles.scss';

interface Props {
  lowestRatedReview;
  highestRatedReview;
  restaurantId: string;
}

const FeaturedReviewsDisplay = ({
  lowestRatedReview,
  highestRatedReview,
  restaurantId
}: Props) => {
  if (lowestRatedReview === highestRatedReview) return null;
  if (!lowestRatedReview || !highestRatedReview) return null;

  return (
    <div className="featured-reviews-container">
      <div className="item">
        <h2>Highest rated review:</h2>
        <ReviewDisplay review={highestRatedReview} restaurantId={restaurantId} />
      </div>
      <div className="item">
        <h2>Lowest rated review:</h2>
        <ReviewDisplay review={lowestRatedReview} restaurantId={restaurantId} />
      </div>
      <br />
    </div>
  )
}

export default FeaturedReviewsDisplay
