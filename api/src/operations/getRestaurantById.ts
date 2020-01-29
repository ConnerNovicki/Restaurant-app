import { GetRestaurantByIdArgs, GetRestaurantByIdResult } from "../../Shared/restTypes";
import { RestArgs } from "../types";

export default async ({
  body,
  prisma,
  req
}: RestArgs<GetRestaurantByIdArgs>): Promise<GetRestaurantByIdResult> => {
  const restaurant = await prisma.restaurants.findOne({
    where: { id: req.params.id },
    select: {
      id: true,
      name: true,
      description: true,
      reviews: {
        select: {
          id: true,
          author: { select: { username: true, id: true, } },
          dateOfVisit: true,
          createdAt: true,
          rating: true,
          comments: {
            select: {
              id: true,
              author: { select: { username: true, id: true, } },
              updatedAt: true,
              text: true,
            }
          }
        }
      }
    }
  });

  const numReviews = restaurant.reviews.length;
  const { numComments, totalRating } = restaurant.reviews.reduce(
    ({ numComments, totalRating }, review) => ({
      numComments: numComments + review.comments.length,
      totalRating: totalRating + review.rating,
    }),
    { totalRating: 0, numComments: 0 });
  const averageRating = Number((totalRating / numReviews).toFixed(2));

  return {
    ...restaurant,
    numReviews,
    numComments,
    averageRating,
  };
}