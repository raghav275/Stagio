import { Event, Razorpay } from "@typings/event";
import axios from "axios";
// axios.defaults.withCredentials = true;
export const createEvent = async (
  title: string,
  description: string,
  date: Date,
  time: Date,
  price: number,
  owner: string,
  poster: string,
  cookies:string,
  banner?: string,
  event_id?: string,
): Promise<{ success: string; event: Event }> => {
  const res = await axios(`${process.env.BASE_URL}api/event/create`, {
    withCredentials: true,
    method: event_id ? "PATCH" : "POST",
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Credentials": "true",
      Authorization:cookies
    },
    data: {
      title,
      description,
      date,
      time,
      price,
      owner,
      poster,
      banner,
      event_id,
    },
  });
  return res.data;
};

export const getEvent = async (
  id?: string
): Promise<{ success: string; event: Event | Event[] }> => {
  const res = await axios(`${process.env.BASE_URL}api/event/get`, {
    withCredentials: true,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id,
    },
  });
  return res.data;
};

export const checkEvent = async (
  url: string,
  cookies: string
): Promise<{ success: string; messsage: string }> => {
  const res = await axios(`${process.env.BASE_URL}api/event/check/` + url, {
    withCredentials: true,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Credentials": "true",
      Authorization: cookies,
    },
  });
  return res.data;
};

export const deleteEvent = async (id: string): Promise<Event> => {
  const res = await axios(`${process.env.BASE_URL}api/event/delete`, {
    withCredentials: true,
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id,
    },
  });
  return res.data;
};
export const razorpay = async (id: string): Promise<Razorpay> => {
  const res = await axios(`${process.env.BASE_URL}razorpay`, {
    withCredentials: true,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id,
    },
  });
  return res.data;
};
export const bookEvent = async (id: string, email: string,cookies:string): Promise<Event> => {
  const res = await axios(`${process.env.BASE_URL}api/event/book`, {
    withCredentials: true,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:cookies
    },
    data: {
      id,
      email,
    },
  });
  return res.data;
};
export const setStatus = async (id: string, status: number) => {
  const res = await axios(`${process.env.BASE_URL}api/event/setstatus`, {
    withCredentials: true,
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id,
      status,
    },
  });
  return res.data;
};

export async function bookingStatus(
  id: string,
  email: string
): Promise<{ success: string; status: number }> {
  const data = { id: id, email: email };
  const res = await axios(`${process.env.BASE_URL}api/event/bookingstatus`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    params: data,
  });
  return res.data;
}

export const cancel = async (id: string, email: string) => {
  const res = await axios(`${process.env.BASE_URL}api/event/cancelbooking`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id,
      email,
    },
  });
  return res.data;
};
