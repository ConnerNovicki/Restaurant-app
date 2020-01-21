import { GetUserRestaurantsResult, GetUserResult } from "../../Shared/restTypes";
import { getUser } from "../utils";
import { RestArgs } from "../types";

export default async ({
  body,
  photon,
  req
}: RestArgs<{}>): Promise<GetUserResult> => {
  const user = await getUser(req, photon);
  return user;
}