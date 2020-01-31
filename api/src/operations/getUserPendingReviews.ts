import { getUser } from "../utils";
import { RestArgs } from "../types";
import { GetUserPendingReviews } from "../../Shared/restTypes";

export default async ({
  prisma,
  req
}: RestArgs<{}>): Promise<GetUserPendingReviews> => {
  const user = await getUser(req, prisma);
  if (user.role !== 'OWNER') {
    throw new Error('Only owners can get pending comments');
  }

  const allReviews = await prisma.reviews.findMany({
    where: {
      restaurant: { owner: { id: user.id } },
    },
    select: {
      restaurant: {
        select: {
          name: true,
          id: true,
        }
      },
      id: true,
      rating: true,
      dateOfVisit: true,
      author: { select: { username: true } },
      comments: {
        select: {
          id: true,
          author: { select: { username: true } },
          createdAt: true,
          text: true,
          updatedAt: true,
        },
      }
    }
  });

  return allReviews.filter(review => review.comments.length === 1);
}