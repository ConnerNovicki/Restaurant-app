import { PostUserArgs, PostUserResult } from "../../Shared/restTypes";
import { createToken, generateSalt } from "../utils";
import { RestArgs } from "../types";

export default async ({
  body,
  photon
}: RestArgs<PostUserArgs>): Promise<PostUserResult> => {
  const { role, username, password } = body;
  const passwordSalt = await generateSalt(password);

  const user = await photon.users.create({
    data: {
      role,
      username,
      passwordSalt,
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
