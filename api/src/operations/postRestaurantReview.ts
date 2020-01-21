import { RestArgs } from "../types";
import { PostRestaurantReviewArgs, PostRestaurantReviewResult } from "../../Shared/restTypes";
import { getUser } from "../utils";

export default async ({
  body,
  photon,
  req
}: RestArgs<PostRestaurantReviewArgs>): Promise<PostRestaurantReviewResult> => {
  const user = await getUser(req, photon);
  const { rating, comment, dateOfVisit } = body;
  const { id } = req.params;

  const review = await photon.reviews.create({
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