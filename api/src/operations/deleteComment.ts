import { DeleteCommentResult } from "../../Shared/restTypes";
import { RestArgs } from "../types";
import { getUser } from "../utils";

export default async ({
  body,
  photon,
  req
}: RestArgs<{}>): Promise<DeleteCommentResult> => {
  const user = await getUser(req, photon);
  if (user.role !== 'ADMIN') throw new Error('You cannot access this information')

  const { id } = req.params;

  const deletedComment = await photon.comments.delete({
    where: { id },
    select: {
      id: true,
    }
  });

  return deletedComment;
}