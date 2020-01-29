import React, { useState } from 'react'
import { GetRestaurantByIdResult } from '../../../../generated/restTypes'
import { Button } from 'antd';
import CreateReviewModal from './CreateReviewModal'
import DeleteRestaurantButton from '../../../components/DeleteRestaurantButton'
import ReviewDisplay from './ReviewDisplay';
import useUserOwnsRestaurant from '../../../lib/useUserOwnsRestaurant';
import Block from '../../../components/Block';
import foodImg from '../../../assets/food1.png';
import './styles.scss';
import FeaturedReviewsDisplay from './FeaturedReviewsDisplay';
import { getSpecificReviews } from '../../../lib/getSpecificReviews';

interface Props {
  restaurantDetailed: GetRestaurantByIdResult;
}

const RestaurantDetailedDisplay = ({ restaurantDetailed }: Props) => {
  const userOwnsRestaurant = useUserOwnsRestaurant({ restaurantId: restaurantDetailed.id });
  const [isAddingComment, setIsAddingComment] = useState(false);

  const {
    lowestRatedReview,
    highestRatedReview,
    filteredReviewsByRating
  } = getSpecificReviews(restaurantDetailed.reviews);

  return (
    <Block classNames={['restaurant-detailed']}>
      <div className="header">
        <div className="food-img" style={{ backgroundImage: `url(${foodImg})` }} />
        <div className="content">
          <h2>Name: {restaurantDetailed.name}</h2>
          <h3>Description: {restaurantDetailed.description}</h3>
          {!!restaurantDetailed.averageRating
            ? <h4>Average Rating: {restaurantDetailed.averageRating}</h4>
            : <h4>No ratings yet</h4>
          }
        </div>
      </div>

      <FeaturedReviewsDisplay
        highestRatedReview={highestRatedReview}
        lowestRatedReview={lowestRatedReview}
        restaurantId={restaurantDetailed.id}
      />

      <div className="all-reviews-container">
        {!!filteredReviewsByRating.length && (
          <>
            <h2>Recent Reviews: </h2>
            <div className="all-reviews-grid">
              {filteredReviewsByRating.map(review => (
                <ReviewDisplay review={review} restaurantId={restaurantDetailed.id} />
              ))}
            </div>
          </>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {!userOwnsRestaurant && <Button onClick={() => setIsAddingComment(true)}>Add Review</Button>}
        {isAddingComment && (
          <CreateReviewModal
            restaurantDetailed={restaurantDetailed}
            setIsVisible={setIsAddingComment}
          />)}
        <DeleteRestaurantButton restaurantId={restaurantDetailed.id} />
      </div>
    </Block>
  )
}

export default RestaurantDetailedDisplay;
