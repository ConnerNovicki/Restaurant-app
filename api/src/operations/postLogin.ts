import { PostLoginArgs, PostLoginResult } from "../../Shared/restTypes";
import { Photon } from "@prisma/photon";
import { createToken } from "../utils";
import { RestArgs } from "../types";

export default async ({ 
  body, 
  photon
 }: RestArgs<PostLoginArgs>): Promise<PostLoginResult> => {
  const { username, password } = body;
  const user = await photon.users.findOne({
    where: { username },
    select: {
      id: true,
      username: true,
      role: true,
    }
  });

  if (!user) throw new Error('Not authroized');

  const token = createToken({ userId: user.id });

  return { user, token };

}
