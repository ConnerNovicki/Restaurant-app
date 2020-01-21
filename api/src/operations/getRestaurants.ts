import { GetRestaurantsResult } from "../../Shared/restTypes";
import { RestArgs } from "../types";

export default async ({
  body,
  photon,
  req
}: RestArgs<{}>): Promise<GetRestaurantsResult> => {
  const restaurants = await photon.restaurants.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      reviews: {
        select: {
          id: true,
          comments: {
            select: { id: true }
          }
        }
      }
    }
  });

  const restaurantsMap = restaurants.map(restaurant => ({
    id: restaurant.id,
    description: restaurant.description,
    name: restaurant.name,
    numReviews: restaurant.reviews.length,
    numComments: restaurant.reviews.reduce((count, review) => count + review.comments.length, 0)
  }))

  return restaurantsMap;
}