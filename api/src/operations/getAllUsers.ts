import { GetAllUsersResult } from "../../Shared/restTypes";
import { RestArgs } from "../types";
import { getUser } from "../utils";

export default async ({
  body,
  prisma,
  req
}: RestArgs<{}>): Promise<GetAllUsersResult> => {
  const user = await getUser(req, prisma);
  if (user.role !== 'ADMIN') throw new Error('You cannot access this information')

  const users = await prisma.users.findMany({
    select: {
      id: true,
      username: true,
      role: true,
      createdAt: true,
    }
  });

  return users;
}