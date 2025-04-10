"use client";

import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
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
const Login = () => {
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

  const onSubmit = async (val) => {
    try {
      const user = await axios.post(`${BASE_URL}/auth/login`, val);

      if (user) {
        toast("User successfully register.");
      }

      localStorage.setItem("token", user.data.token);

      const decodedToken = jwtDecode(user.data.token);

      if (decodedToken.user.role == "ADMIN") {
        router.push("/admin");
        return;
      } else {
        router.push("/");
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="w-1/4">
      <h1>Нэвтрэх</h1>
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

export default Login;
