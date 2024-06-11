import { getAllUser } from "@/lib/actions/user";

export const GET = async () => {
  const data = await getAllUser();

  console.log('data;', data)
  return Response.json(data);
};
