import NextAuth from "next-auth";
import { User } from "@typings/User";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
