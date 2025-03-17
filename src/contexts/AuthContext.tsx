import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import authService from "../services/auth-service";
import { UserProfile } from "../models/UserProfile";

interface AuthContextType {
  profile: UserProfile | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
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

// AuthContext.tsx
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    authService.isAuthenticated()
  );
  const [profile, setProfile] = useState<UserProfile | null>(
    authService.getProfileFromStorage()
  );

  const login = async () => {
    try {
      const profile = await authService.getProfile();
      setProfile(profile);
      setIsAuthenticated(true);
    } catch (error) {
      logout();
      throw error; // Propagate the error
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setProfile(null);
  };

  // Add useEffect to check auth state on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const profile = await authService.getProfile();
          setProfile(profile);
          setIsAuthenticated(true);
        } catch (error) {
          logout();
        }
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        profile,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
