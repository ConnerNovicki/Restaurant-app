import { DeleteUserResult } from "../../Shared/restTypes";
import { RestArgs } from "../types";
import { getUser } from "../utils";

export default async ({
  body,
  prisma,
  req
}: RestArgs<{}>): Promise<DeleteUserResult> => {
  const user = await getUser(req, prisma);
  if (user.role !== 'ADMIN') throw new Error('You cannot access this information')

  const { id } = req.params;

  await prisma.comments.deleteMany({ where: { author: { id } } });
  await prisma.reviews.deleteMany({ where: { author: { id } } });
  await prisma.restaurants.deleteMany({ where: { owner: { id } } });

  const deletedUser = await prisma.users.delete({
    where: { id },
    select: {
      id: true,
    }
  });
  return deletedUser;
}