import { GetRestaurantsResult } from "../../Shared/restTypes";
import { RestArgs } from "../types";
import { getUser } from "../utils";

export default async ({
  prisma,
  req
}: RestArgs<{}>): Promise<GetRestaurantsResult> => {
  await getUser(req, prisma);
  const restaurants = await prisma.restaurants.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      reviews: {
        select: {
          id: true,
          rating: true,
          comments: {
            select: { id: true }
          }
        }
      }
    }
  });

  const restaurantsMap = restaurants.map(restaurant => {
    const numReviews = restaurant.reviews.length;
    const { numComments, totalRating } = restaurant.reviews.reduce(
      ({ numComments, totalRating }, review) => ({
        numComments: numComments + review.comments.length,
        totalRating: totalRating + review.rating,
      }),
      { totalRating: 0, numComments: 0 });
    const averageRating = !!totalRating && !!numReviews
      ? Number((totalRating / numReviews).toFixed(2))
      : null;

    return {
      id: restaurant.id,
      description: restaurant.description,
      name: restaurant.name,
      averageRating,
      numReviews,
      numComments,
    }
  })

  return restaurantsMap;
}