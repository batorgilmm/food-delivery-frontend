"use client";

import { BASE_URL } from "@/constants";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  use,
  useContext,
  useState,
} from "react";
import { toast } from "sonner";

type LoginType = {
  email: string;
  password: string;
};

type UserType = {
  _id: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type DecodeTokenType = {
  user: UserType;
};

type ContextType = {
  user: UserType | null;
  token: string | null;
  login: (_val: LoginType) => void;
  register: (_val: LoginType) => void;
  logout: () => void;
  error: string | null;
};

// default value
const AuthContext = createContext<ContextType>({
  user: null,
  token: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  error: null,
});

const decodeToken = (token) => {
  if (!token) return null;
  const decodedToken = jwtDecode(token);
  return decodedToken.user;
};

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<null | UserType>(
    decodeToken(
      typeof window !== "undefined" && localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null
    ) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [error, setError] = useState<null | string>(null);

  const login = async (value: LoginType) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, value);
      if (response) {
        toast("User successfully register.");
      }

      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      const user = decodeToken(response.data.token);

      setUser(user);

      if (user.role == "ADMIN") {
        router.push("/admin");
        return;
      } else {
        router.push("/");
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const register = async (value: LoginType) => {
    try {
      const user = await axios.post(`${BASE_URL}/auth/register`, value);

      if (user) {
        toast("User successfully register.");
        router.push("/login");
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
