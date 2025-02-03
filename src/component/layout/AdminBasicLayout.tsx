import { ReactNode } from "react";

export default function AdminBasicLayout({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <>
      {/* TODO: ADMIN NAVBAR */}
      {children}
    </>
  )
}