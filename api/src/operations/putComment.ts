import { PutResult, PutCommentArgs } from "../../Shared/restTypes";
import { RestArgs } from "../types";

export default async ({
  body,
  prisma,
  req,
}: RestArgs<PutCommentArgs>): Promise<PutResult> => {
  const { id } = req.params;

  const comment = await prisma.comments.update({
    where: { id },
    data: body,
    select: { id: true },
  });

  return { id: comment.id };
}
