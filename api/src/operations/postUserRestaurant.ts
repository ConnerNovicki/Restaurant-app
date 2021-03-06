import { PostUserRestaurantArgs, PostUserRestaurantResult } from "../../Shared/restTypes";
import { RestArgs } from "../types";
import { getUser } from "../utils";

export default async ({
  req,
  body,
  prisma
}: RestArgs<PostUserRestaurantArgs>): Promise<PostUserRestaurantResult> => {
  const user = await getUser(req, prisma);
  const { name, description } = body;
  const restaurant = await prisma.restaurants.create({
    data: {
      owner: { connect: { id: user.id } },
      name,
      description,
    }
  });

  return restaurant;
}