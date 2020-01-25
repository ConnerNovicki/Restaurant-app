import { PutResult, PutReviewArgs } from "../../Shared/restTypes";
import { RestArgs } from "../types";

export default async ({
  body,
  photon,
  req,
}: RestArgs<PutReviewArgs>): Promise<PutResult> => {
  const { id } = req.params;

  const review = await photon.reviews.update({
    where: { id },
    data: body,
    select: { id: true },
  });

  return { id: review.id };
}
