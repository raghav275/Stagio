import axios from "axios";
import { Login } from "@typings/auth";
import { User } from "@typings/profile";

export async function getProfile(
  username?: string
): Promise<{ sucess: string; user: User | User[] }> {
  const res = await axios(`${process.env.BASE_URL}api/profile/getProfile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: { username },
  }).then((response) => response);
//   console.log(res);
  return res.data;
}
