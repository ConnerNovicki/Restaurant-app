import { DeleteRestaurantResult } from "../../Shared/restTypes";
import { RestArgs } from "../types";
import { getUser } from "../utils";

export default async ({
  body,
  photon,
  req
}: RestArgs<{}>): Promise<DeleteRestaurantResult> => {
  const user = await getUser(req, photon);
  const { id } = req.params;

  const userCanEdit = await photon.users.findOne({
    where: { id: user.id },
    select: {
      ownedRestaurants: {
        where: { id },
      }
    }
  });

  if (
    user.role !== 'ADMIN'
    && !userCanEdit.ownedRestaurants.length) {
    throw new Error('You cannot access this information')
  }

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