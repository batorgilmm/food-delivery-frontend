"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div className="px-2 flex justify-between w-full">
      {user ? (
        <>
          <h1>{user?.email}</h1>
          <Button onClick={logout}>Logout</Button>
        </>
      ) : (
        <div className="flex gap-2 w-full justify-end">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      )}
    </div>
  );
};
