import { createContext, useContext } from "react";
import type { AppUser } from "@/types/AppUser";

export type AuthStatus = "loading" | "authenticated" | "anonymous";

export type LoggedInUserContextValue = {
  status: AuthStatus;
  user: AppUser | null;
  clearUser: () => void;
  refreshUser: () => Promise<AppUser | null>;
  login: (user: AppUser) => void;
  logout: () => Promise<void>;
};

export const LoggedInUserContext = createContext<
  LoggedInUserContextValue | undefined
>(undefined);

export default function useLoggedInUserContext() {
  const context = useContext(LoggedInUserContext);
  if (!context) {
    throw new Error(
      "useLoggedInUserContext must be used within LoggedInUserProvider",
    );
  }

  return context;
}
