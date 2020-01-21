import { DeleteRestaurantResult } from "../../Shared/restTypes";
import { RestArgs } from "../types";
import { getUser } from "../utils";

export default async ({
  body,
  photon,
  req
}: RestArgs<{}>): Promise<DeleteRestaurantResult> => {
  const user = await getUser(req, photon);
  if (user.role !== 'ADMIN') throw new Error('You cannot access this information')

  const { id } = req.params;

  const reviews = await photon.reviews.findMany({
    where: { restaurant: { id } },
  });

  await photon.comments.deleteMany({
    where: {
      review: {
        id: { in: reviews.map(r => r.id) }
      }
    }
  });

  await photon.reviews.deleteMany({
    where: { restaurant: { id } },
  });

  const deletedRestaurant = await photon.restaurants.delete({
    where: { id },
    select: {
      id: true,
    }
  });

  return deletedRestaurant;
}