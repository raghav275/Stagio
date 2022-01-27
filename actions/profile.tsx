import axios from "axios";
import { Login } from "@typings/auth";
import { User } from "@typings/profile";

export async function getProfile(
  username?: string
): Promise<{ sucess: string; user: User | User[] }> {
  const res = await axios(`${process.env.BASE_URL}api/profile/getprofile`, {
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
export async function updateProfilePic(
  email: string,
  profilePic: string
): Promise<{ success: string; profile_pic: string; message: string }> {
  const res = await axios(
    `${process.env.BASE_URL}api/profile/updateprofilepic`,
    {
      method: "POST",
      headers: {
        Accept: "applciation/json",
        "Content-Type": "application/json",
      },
      data: { email, profilePic },
    }
  ).then((response) => response);
  return res.data;
}
