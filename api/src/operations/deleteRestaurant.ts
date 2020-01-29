import { DeleteRestaurantResult } from "../../Shared/restTypes";
import { RestArgs } from "../types";
import { getUser } from "../utils";

export default async ({
  body,
  prisma,
  req
}: RestArgs<{}>): Promise<DeleteRestaurantResult> => {
  const user = await getUser(req, prisma);
  const { id } = req.params;

  const userCanEdit = await prisma.users.findOne({
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

  const reviews = await prisma.reviews.findMany({
    where: { restaurant: { id } },
  });

  await prisma.comments.deleteMany({
    where: {
      review: {
        id: { in: reviews.map(r => r.id) }
      }
    }
  });

  await prisma.reviews.deleteMany({
    where: { restaurant: { id } },
  });

  const deletedRestaurant = await prisma.restaurants.delete({
    where: { id },
    select: {
      id: true,
    }
  });

  return deletedRestaurant;
}