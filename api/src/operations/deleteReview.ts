import { DeleteReviewResult } from "../../Shared/restTypes";
import { RestArgs } from "../types";
import { getUser } from "../utils";

export default async ({
  body,
  prisma,
  req
}: RestArgs<{}>): Promise<DeleteReviewResult> => {
  const user = await getUser(req, prisma);
  if (user.role !== 'ADMIN') throw new Error('You cannot access this information')

  const { id } = req.params;

  await prisma.comments.deleteMany({ where: { review: { id } } });

  const deletedReview = await prisma.reviews.delete({
    where: { id },
    select: {
      id: true,
    }
  });

  return deletedReview;
}