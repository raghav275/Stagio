import axios, { AxiosResponse } from "axios";
import { Login } from "@typings/auth";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;
export const login = async (
  email: string,
  password: string
):Promise<AxiosResponse<Login>> =>  {
  const res = await axios(`${process.env.BASE_URL}api/auth/login`, {
    withCredentials: true,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
    data: { email: email, password: password },
  }).then((response) => response);
  return res;
};

export async function register(
  name: string,
  username: string,
  email: string,
  password: string
): Promise<Login> {
  const res = await axios(`${process.env.BASE_URL}api/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: { name, username, email, password },
  }).then((response) => response);
  // console.log(res);
  return res.data;
}
export async function forgot(email: string): Promise<Login> {
  const res = await axios(`${process.env.BASE_URL}api/auth/forgot`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: { email: email },
  }).then((response) => response);
  // console.log(res);
  return res.data;
}
export async function reset(token: string): Promise<Login> {
  const res = await axios(`${process.env.BASE_URL}api/auth/reset/` + token, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer ",
    },
  }).then((response) => response);
  // console.log(res);
  return res.data;
}
