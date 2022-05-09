import { Event } from "@typings/event";
export interface User {
  username: string;
  email: string;
  events_created: Event[];
  events_bought:Event[];
  profilePic: string;
  name: string;
  description:string;
}
