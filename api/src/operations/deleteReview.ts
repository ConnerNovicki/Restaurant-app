import { DeleteReviewResult } from "../../Shared/restTypes";
import { RestArgs } from "../types";
import { getUser } from "../utils";

export default async ({
  body,
  photon,
  req
}: RestArgs<{}>): Promise<DeleteReviewResult> => {
  const user = await getUser(req, photon);
  if (user.role !== 'ADMIN') throw new Error('You cannot access this information')

  const { id } = req.params;

  await photon.comments.deleteMany({ where: { review: { id } } });

  const deletedReview = await photon.reviews.delete({
    where: { id },
    select: {
      id: true,
    }
  });

  return deletedReview;
}