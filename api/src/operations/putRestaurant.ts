import { PutResult, PutRestaurantArgs } from "../../Shared/restTypes";
import { RestArgs } from "../types";

export default async ({
  body,
  photon,
  req,
}: RestArgs<PutRestaurantArgs>): Promise<PutResult> => {
  const { id } = req.params;

  const restaurant = await photon.restaurants.update({
    where: { id },
    data: body,
    select: { id: true },
  });

  return { id: restaurant.id };
}
