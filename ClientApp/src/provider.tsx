import type { ReactNode } from "react";
import { LoggedInUserProvider } from "@/Context/UserContext";

export function Provider({ children }: { children: ReactNode }) {
  return <LoggedInUserProvider>{children}</LoggedInUserProvider>;
}
