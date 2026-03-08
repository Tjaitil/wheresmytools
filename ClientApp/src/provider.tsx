import type { ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";
import { LoggedInUserProvider } from "@/Context/UserContext";

export function Provider({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <LoggedInUserProvider>{children}</LoggedInUserProvider>
    </HeroUIProvider>
  );
}
