import { GetRestaurantByIdArgs, GetRestaurantByIdResult } from "../../Shared/restTypes";
import { RestArgs } from "../types";

export default async ({
  body,
  photon,
  req
}: RestArgs<GetRestaurantByIdArgs>): Promise<GetRestaurantByIdResult> => {
  const restaurant = await photon.restaurants.findOne({
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

  return {
    ...restaurant,
    numReviews: restaurant.reviews.length,
    numComments: restaurant.reviews.reduce((count, review) => count + review.comments.length, 0)
  };
}