import { RestArgs } from "../types";
import { PostRestaurantReviewArgs, PostRestaurantReviewResult } from "../../Shared/restTypes";
import { getUser } from "../utils";

export default async ({
  body,
  prisma,
  req
}: RestArgs<PostRestaurantReviewArgs>): Promise<PostRestaurantReviewResult> => {
  const user = await getUser(req, prisma);
  const { rating, comment, dateOfVisit } = body;
  const { id } = req.params;

  const review = await prisma.reviews.create({
    data: {
      restaurant: { connect: { id } },
      rating,
      dateOfVisit,
      author: { connect: { id: user.id } }, 
      comments: {
        create: {
          text: comment,
          author: { connect: { id: user.id } },
        }
      }
    },
    select: {
      id: true,
      dateOfVisit: true,
      rating: true,
    }
  });

  return review;
}