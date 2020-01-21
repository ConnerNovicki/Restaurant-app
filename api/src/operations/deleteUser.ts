import { DeleteUserResult } from "../../Shared/restTypes";
import { RestArgs } from "../types";
import { getUser } from "../utils";

export default async ({
  body,
  photon,
  req
}: RestArgs<{}>): Promise<DeleteUserResult> => {
  const user = await getUser(req, photon);
  if (user.role !== 'ADMIN') throw new Error('You cannot access this information')

  const { id } = req.params;

  await photon.comments.deleteMany({ where: { author: { id } } });
  await photon.reviews.deleteMany({ where: { author: { id } } });
  await photon.restaurants.deleteMany({ where: { owner: { id } } });

  const deletedUser = await photon.users.delete({
    where: { id },
    select: {
      id: true,
    }
  });
  return deletedUser;
}