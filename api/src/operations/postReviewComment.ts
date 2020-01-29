import { RestArgs } from "../types";
import { PostReviewCommentArgs, PostReviewCommentResult } from "../../Shared/restTypes";
import { getUser } from "../utils";

export default async ({
  body,
  prisma,
  req
}: RestArgs<PostReviewCommentArgs>): Promise<PostReviewCommentResult> => {
  const user = await getUser(req, prisma);
  const { comment } = body;
  const { id } = req.params;

  const createdComment = await prisma.comments.create({
    data: {
      review: { connect: { id } },
      text: comment,
      author: { connect: { id: user.id } },
    }
  });

  return createdComment;
}