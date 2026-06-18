import type { ReactNode } from "react";

export default function PageContainer(props: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <main
      className={`grid grid-cols-[repeat(12,1fr)] mx-auto max-w-7xl${props.className ? ` ${props.className}` : ""}`}
    >
      {props.children}
    </main>
  );
}
