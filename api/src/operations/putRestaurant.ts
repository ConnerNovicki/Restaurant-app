import { PutResult, PutRestaurantArgs } from "../../Shared/restTypes";
import { RestArgs } from "../types";

export default async ({
  body,
  prisma,
  req,
}: RestArgs<PutRestaurantArgs>): Promise<PutResult> => {
  const { id } = req.params;

  const restaurant = await prisma.restaurants.update({
    where: { id },
    data: body,
    select: { id: true },
  });

  return { id: restaurant.id };
}
