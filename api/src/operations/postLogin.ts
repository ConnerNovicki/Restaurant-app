import { PostLoginArgs, PostLoginResult } from "../../Shared/restTypes";
import { createToken, isValidPassword } from "../utils";
import { RestArgs } from "../types";

export default async ({
  body,
  prisma
}: RestArgs<PostLoginArgs>): Promise<PostLoginResult> => {
  const { username, password } = body;
  const user = await prisma.users.findOne({
    where: { username },
    select: {
      id: true,
      username: true,
      passwordSalt: true,
      role: true,
    }
  });

  if (!user) throw new Error('Not authroized');

  const isValid = await isValidPassword(password, user.passwordSalt)

  if (!isValid) throw new Error('Not authorized');

  const token = createToken({ userId: user.id });

  return { user, token };

}
