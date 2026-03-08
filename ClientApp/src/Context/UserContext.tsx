import { useState, type ReactNode } from "react";
import type { AppUser } from "@/types/AppUser";
import type { AuthSession } from "@/types/AuthSession.ts";
import { LoggedInUserContext } from "@/Context/LoggedInUserContext";
import zod, { type ZodType } from "zod";

const JWT_STORAGE_KEY = "jwtToken";
const USER_STORAGE_KEY = "loggedInUser";

const AppUserSchema = zod.object({
  id: zod.string(),
  username: zod.string(),
  role: zod.string(),
  createdAtUtc: zod.string(),
}) satisfies ZodType<AppUser>;

function getStoredUser(): AppUser | null {
  const rawValue = localStorage.getItem(USER_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    return zod.parse(AppUserSchema, JSON.parse(rawValue));
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

export function LoggedInUserProvider({ children }: { children: ReactNode }) {
  const [jwtToken, setJwtToken] = useState<string | null>(() =>
    localStorage.getItem(JWT_STORAGE_KEY),
  );
  const [user, setUser] = useState<AppUser | null>(() => getStoredUser());

  const login = (session: AuthSession) => {
    setJwtToken(session.accessToken);
    setUser(session.user);
    localStorage.setItem(JWT_STORAGE_KEY, session.accessToken);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(session.user));
  };

  const logout = () => {
    setJwtToken(null);
    setUser(null);
    localStorage.removeItem(JWT_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  return (
    <LoggedInUserContext.Provider
      value={{
        jwtToken,
        user,
        isAuthenticated: Boolean(jwtToken),
        login,
        logout,
      }}
    >
      {children}
    </LoggedInUserContext.Provider>
  );
}
