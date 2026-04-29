import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AppUser } from "@/types/AppUser";
import {
  type AuthStatus,
  LoggedInUserContext,
} from "@/Context/LoggedInUserContext";
import zod, { type ZodType } from "zod";
import { toast } from "@heroui/react";

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
  const [user, setUser] = useState<AppUser | null>(() => getStoredUser());
  const [status, setStatus] = useState<AuthStatus>(() =>
    getStoredUser() ? "authenticated" : "loading",
  );

  const login = useCallback((nextUser: AppUser) => {
    setUser(nextUser);
    setStatus("authenticated");
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
  }, []);

  const clearUser = useCallback((): void => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
    setStatus("anonymous");
  }, []);

  const refreshUser = useCallback(
    async (signal?: AbortSignal): Promise<AppUser | null> => {
      const response = await fetch("/api/me", {
        credentials: "include",
        signal,
      });

      if (!response.ok) {
        clearUser();
        return null;
      }

      const data = await response.json();
      const parsedData = AppUserSchema.safeParse(data);
      if (!parsedData.success) {
        clearUser();
        return null;
      }

      login(parsedData.data);
      return parsedData.data;
    },
    [clearUser, login],
  );

  const logout = useCallback(async () => {
    clearUser();
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" });
    } catch {
      toast("Something went wrong!");
    }
  }, [clearUser]);

  useEffect(() => {
    const controller = new AbortController();
    const user = getStoredUser();

    if (user === null) {
      setStatus("anonymous");
      return;
    }

    const bootstrapAuth = async () => {
      try {
        await refreshUser(controller.signal);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        clearUser();
      } finally {
        if (!controller.signal.aborted) {
          setStatus((currentStatus) =>
            currentStatus === "loading" ? "anonymous" : currentStatus,
          );
        }
      }
    };

    void bootstrapAuth();

    return () => {
      controller.abort();
    };
  }, [clearUser, refreshUser]);

  const contextValue = useMemo(
    () => ({
      status,
      user,
      clearUser,
      refreshUser,
      login,
      logout,
    }),
    [status, user, clearUser, refreshUser, login, logout],
  );

  return (
    <LoggedInUserContext.Provider value={contextValue}>
      {children}
    </LoggedInUserContext.Provider>
  );
}
