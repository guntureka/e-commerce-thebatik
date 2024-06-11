import { getAllUser } from "@/lib/actions/user";

export const GET = async () => {
  const user = await getAllUser();

  return Response.json(user);
};
