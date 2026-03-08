import type { AppUser } from "@/types/AppUser.ts";

export type AuthSession = {
  accessToken: string;
  user: AppUser;
};
