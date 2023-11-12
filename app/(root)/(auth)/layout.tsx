import { options } from "@/lib/nextAuthOptions";
import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  if (session) {
    if (session.user.isAdmin) {
      redirect("/dashboard");
    } else {
      redirect("/");
    }
  }

  return <>{children}</>;
}
