"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoginType } from "../login/page";

export type ErrorType = {
  response: {
    data: {
      error: string;
    };
  };
};

const Register = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(8),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (val: LoginType) => {
    try {
      const user = await axios.post(`${BASE_URL}/auth/register`, val);

      if (user) {
        toast("User successfully register.");
        router.push("/login");
      }
    } catch (error: unknown) {
      setError((error as ErrorType).response.data.error);
    }
  };

  return (
    <div className="w-1/4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="my-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Register;
