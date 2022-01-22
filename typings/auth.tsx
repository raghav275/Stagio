import { User } from "./profile";

export interface Login {
  success: string;
  token: string;
  user: User;
}
