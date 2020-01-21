import { GetUserRestaurantsResult } from "../../Shared/restTypes";
import { getUser } from "../utils";
import { RestArgs } from "../types";

export default async ({
  body,
  photon,
  req
}: RestArgs<{}>): Promise<GetUserRestaurantsResult> => {
  const user = await getUser(req, photon);
  if (user.role !== 'OWNER') {
    throw new Error('Only owners can query their restaurants.')
  }

  const restaurants = await photon.restaurants.findMany({
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

  return restaurants;
}