import { GetUserRestaurantsResult, GetUserResult } from "../../Shared/restTypes";
import { getUser } from "../utils";
import { RestArgs } from "../types";

export default async ({
  body,
  prisma,
  req
}: RestArgs<{}>): Promise<GetUserResult> => {
  const user = await getUser(req, prisma);
  return user;
}