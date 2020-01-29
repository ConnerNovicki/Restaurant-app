import { PutResult, PutUserArgs } from "../../Shared/restTypes";
import { RestArgs } from "../types";

export default async ({
  body,
  prisma,
  req,
}: RestArgs<PutUserArgs>): Promise<PutResult> => {
  const { id } = req.params;

  const user = await prisma.users.update({
    where: { id },
    data: body,
    select: { id: true },
  });

  return { id: user.id };
}
