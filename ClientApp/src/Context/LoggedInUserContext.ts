import { createContext, useContext } from "react";
import type { AppUser } from "@/types/AppUser";
import type { AuthSession } from "@/types/AuthSession.ts";

export type LoggedInUserContextValue = {
  jwtToken: string | null;
  user: AppUser | null;
  isAuthenticated: boolean;
  login: (session: AuthSession) => void;
  logout: () => void;
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
