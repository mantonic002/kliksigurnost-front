import { createContext, useContext, useState, ReactNode } from "react";
import authService from "../services/auth-service";

interface AuthContextType {
  email: string;
  role: string;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    authService.isAuthenticated()
  );

  const [email, setEmail] = useState<string>(authService.getEmail()!);
  const [role, setRole] = useState<string>(authService.getRole()!);

  const login = () => {
    setIsAuthenticated(true);
    setEmail(authService.getEmail()!);
    setRole(authService.getRole()!);
  };
  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setEmail("");
    setRole("");
  };

  return (
    <AuthContext.Provider
      value={{ email, role, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
