"use client";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  const router = useRouter();

  useLayoutEffect(() => {
    if (user.role != "ADMIN") {
      router.push("/");
    }
  }, []);
  return <section>{children}</section>;
}
