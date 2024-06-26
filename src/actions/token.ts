import { v4 as uuidv4 } from "uuid";

export const generateToken = async () => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  return {
    token,
    expires,
  };
};
