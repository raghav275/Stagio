import { Event } from "@typings/event";
export interface User {
  username: string;
  email: string;
  events: Event[];
  profilePic: string;
  name: string;
}
