"use client";

import { ErrorType } from "@/app/(auth)/register/page";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { toast } from "sonner";

const AuthContext = createContext({
  user: null,
  token: null,
  error: "",
  login: (_val: any) => {},
  logout: () => {},
});

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  const router = useRouter();

  const login = async (value: any) => {
    try {
      const user = await axios.post(`${BASE_URL}/auth/login`, value);
      if (user) {
        toast("User successfully register.");
      }

      localStorage.setItem("token", user.data.token);

      const decodedToken: any = jwtDecode(user.data.token);

      if (decodedToken.user.role == "ADMIN") {
        router.push("/admin");
        return;
      } else {
        router.push("/");
      }
    } catch (error: unknown) {
      setError((error as ErrorType).response.data.error);
    }
  };

  const logout = () => {};

  return (
    <AuthContext.Provider value={{ user, token, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
