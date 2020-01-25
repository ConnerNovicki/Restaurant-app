import { PutResult, PutUserArgs } from "../../Shared/restTypes";
import { RestArgs } from "../types";

export default async ({
  body,
  photon,
  req,
}: RestArgs<PutUserArgs>): Promise<PutResult> => {
  const { id } = req.params;

  const user = await photon.users.update({
    where: { id },
    data: body,
    select: { id: true },
  });

  return { id: user.id };
}
