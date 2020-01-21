import { RestArgs } from "../types";
import { PostReviewCommentArgs, PostReviewCommentResult } from "../../Shared/restTypes";
import { getUser } from "../utils";

export default async ({
  body,
  photon,
  req
}: RestArgs<PostRestaurantReviewCommentArgs>): Promise<PostRestaurantReviewCommentResult> => {
  const user = await getUser(req, photon);
  const { comment } = body;
  const { id } = req.params;

  const createdComment = await photon.comments.create({
    data: {
      review: { connect: { id } },
      text: comment,
      author: { connect: { id: user.id } },
    }
  });

  return createdComment;
}