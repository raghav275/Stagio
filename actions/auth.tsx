import axios, { AxiosResponse } from "axios";
import { Login } from "@typings/auth";

export async function login(email: string, password: string): Promise<Login> {
  const res = await axios(`${process.env.BASE_URL}api/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: { email: email, password: password },
  }).then((response) => response);
  return res.data;
}

export async function register(
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
    data: { username: username, email: email, password: password },
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
      "Authorization" : "Bearer "
    },
  }).then((response) => response);
  // console.log(res);
  return res.data;
}

