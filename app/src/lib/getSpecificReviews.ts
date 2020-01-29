import moment from "moment"

type Review = {
  id: string;
  rating: number;
  createdAt: Date;
}

interface GetSpecificReviewsResult {
  filteredReviewsByRating: Review[];
  highestRatedReview: Review;
  lowestRatedReview: Review;
}

export const getSpecificReviews = (reviews: Review[]): GetSpecificReviewsResult => {
  if (reviews.length <= 1) {
    return {
      lowestRatedReview: null,
      highestRatedReview: null,
      filteredReviewsByRating: reviews,
    }
  }

  const highestRatedReview = reviews.reduce(
    (highestRatedReview, currReview) => currReview.rating > highestRatedReview.rating
      ? currReview
      : highestRatedReview,
    reviews[0],
  )

  const lowestRatedReview = reviews.reduce(
    (lowestRatedReview, currReview) => currReview.rating < lowestRatedReview.rating
      ? currReview
      : lowestRatedReview,
    reviews[0],
  )

  const filteredReviewsByRating = reviews
    .filter(review => review.id !== highestRatedReview.id && review.id !== lowestRatedReview.id)
    .sort((a, b) => moment(b.createdAt).isBefore(a.createdAt) ? -1 : 1)
    .slice(0, 3);

  return {
    lowestRatedReview,
    highestRatedReview,
    filteredReviewsByRating
  }
}