import { Event, Razorpay } from "@typings/event";
import axios from "axios";

export const createEvent = async (
  title: string,
  description: string,
  date: Date,
  time: Date,
  price: number,
  owner: string,
  poster: string,
  banner?: string
): Promise<Event> => {
  // console.log(document.cookie);
  const res = await axios(`${process.env.BASE_URL}api/event/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
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
    },
  });
  return res.data;
};

export const getEvent = async (
  id?: string
): Promise<{ success: string; event: Event | Event[] }> => {
  const res = await axios(`${process.env.BASE_URL}api/event/get`, {
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
  email: string,
  url: string
): Promise<Event> => {
  const res = await axios(`${process.env.BASE_URL}api/event/check/` + url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      email,
    },
  });
  return res.data;
};

export const deleteEvent = async (id: string): Promise<Event> => {
  const res = await axios(`${process.env.BASE_URL}api/event/delete`, {
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
export const bookEvent = async (id: string, email: string): Promise<Event> => {
  const res = await axios(`${process.env.BASE_URL}api/event/book`, {
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
