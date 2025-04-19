"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

const Page = () => {
  console.log("testing stack pr 1");
  // batorgilmunkh88@gmail.com
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fromToken = searchParams.get("token");

    setToken(fromToken);
  }, [searchParams]);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const resetPassword = async () => {
    const response = await axios.post(`${BASE_URL}/auth/reset-password`, {
      userEmail: emailRef.current.value,
    });

    toast("Email successfully sent");
  };

  const updatePassword = async () => {
    if (!token) return;

    const decode = jwtDecode(token as string);
    const response = await axios.post(
      `${BASE_URL}/auth/update-password`,
      {
        _id: decode.user._id,
        password: passwordRef.current.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  return (
    <div className="mx-auto w-1/3 mt-10">
      <h1 className="font-semibold text-2xl mb-4">Reset password</h1>
      {!token ? (
        <div className="space-y-4">
          <Input placeholder="Enter your email..." ref={emailRef} />

          <Button onClick={resetPassword} className="w-full cursor-pointer">
            Lets go
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <Input
            placeholder="Enter new password..."
            type="password"
            ref={passwordRef}
          />

          <Button onClick={updatePassword} className="w-full cursor-pointer">
            Lets go
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
