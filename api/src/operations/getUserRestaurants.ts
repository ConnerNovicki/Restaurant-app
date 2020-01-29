import { GetUserRestaurantsResult } from "../../Shared/restTypes";
import { getUser } from "../utils";
import { RestArgs } from "../types";

export default async ({
  body,
  prisma,
  req
}: RestArgs<{}>): Promise<GetUserRestaurantsResult> => {
  const user = await getUser(req, prisma);
  if (user.role !== 'OWNER') {
    throw new Error('Only owners can query their restaurants.')
  }

  const restaurants = await prisma.restaurants.findMany({
    where: {
      owner: { id: user.id },
    },
    select: {
      id: true,
      name: true,
      description: true,
      reviews: {
        select: {
          id: true,
          author: { select: { username: true, } },
          rating: true,
          comments: {
            select: {
              id: true,
              author: { select: { username: true } },
            }
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
    const averageRating = Number((totalRating / numReviews).toFixed(2));

    return {
      ...restaurant,
      id: restaurant.id,
      description: restaurant.description,
      name: restaurant.name,
      averageRating,
      numReviews,
      numComments,
    }
  });

  return restaurantsMap;
}