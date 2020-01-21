import { PostUserArgs, PostUserResult } from "../../Shared/restTypes";
import { createToken } from "../utils";
import { RestArgs } from "../types";

export default async ({
  body,
  photon
}: RestArgs<PostUserArgs>): Promise<PostUserResult> => {
  const { role, username } = body;
  const user = await photon.users.create({
    data: {
      role,
      username,
    },
    select: {
      id: true,
      role: true,
      username: true,
    }
  });

  if (!user) throw new Error('Not authorized')

  const token = createToken({ userId: user.id });

  return {
    user,
    token,
  };
}
