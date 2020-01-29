import React, { useState } from 'react'
import { GetRestaurantByIdResult } from '../../../../../api/Shared/restTypes'
import { Button } from 'antd';
import CreateReviewModal from './CreateReviewModal'
import DeleteRestaurantButton from '../../../components/DeleteRestaurantButton'
import ReviewDisplay from './ReviewDisplay';
import moment from 'moment';
import useUserOwnsRestaurant from '../../../lib/useUserOwnsRestaurant';
import Block from '../../../components/Block';
import foodImg from '../../../assets/food1.png';
import './styles.scss';

interface Props {
  restaurantDetailed: GetRestaurantByIdResult;
}

const RestaurantDetailedDisplay = ({ restaurantDetailed }: Props) => {
  const userOwnsRestaurant = useUserOwnsRestaurant({ restaurantId: restaurantDetailed.id });
  const [isAddingComment, setIsAddingComment] = useState(false);

  const highestRatedReview = restaurantDetailed.reviews.reduce(
    (highestRatedReview, currReview) => currReview.rating > highestRatedReview.rating
      ? currReview
      : highestRatedReview,
    restaurantDetailed.reviews[0],
  )

  const lowestRatedReview = restaurantDetailed.reviews.reduce(
    (lowestRatedReview, currReview) => currReview.rating < lowestRatedReview.rating
      ? currReview
      : lowestRatedReview,
    restaurantDetailed.reviews[0],
  )

  const filteredReviews = restaurantDetailed.reviews
    .sort((a, b) => moment(b.createdAt).isBefore(a.createdAt) ? -1 : 1)
    .filter(review => review.id !== highestRatedReview.id && review.id !== lowestRatedReview.id)
    .slice(0, 3);

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

      {restaurantDetailed.reviews.length > 1 ? (
        <>
          {highestRatedReview && (
            <>
              <h4>Highest rated review:</h4>
              <ReviewDisplay review={highestRatedReview} restaurantId={restaurantDetailed.id} />
              <br />
            </>
          )}

          {lowestRatedReview && (
            <>
              <h4>Lowest rated review:</h4>
              <ReviewDisplay review={lowestRatedReview} restaurantId={restaurantDetailed.id} />
              <br />
            </>
          )}
        </>
      )
        : lowestRatedReview && (
          <>
            <ReviewDisplay review={lowestRatedReview} restaurantId={restaurantDetailed.id} />
            <br />
          </>
        )
      }

      {!!filteredReviews.length && (
        <>
          <h4>Other recent reviews: </h4>
          {filteredReviews.map(review => (
            <ReviewDisplay review={review} restaurantId={restaurantDetailed.id} />
          ))}
        </>
      )}
      {!userOwnsRestaurant && <Button onClick={() => setIsAddingComment(true)}>Add Review</Button>}
      {isAddingComment && (
        <CreateReviewModal
          restaurantDetailed={restaurantDetailed}
          setIsVisible={setIsAddingComment}
        />)}
      <DeleteRestaurantButton restaurantId={restaurantDetailed.id} />
    </Block>
  )
}

export default RestaurantDetailedDisplay;
