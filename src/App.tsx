import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { SidebarData } from "./components/SidebarData";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import TopBar from "./components/TopBar";
import deviceService from "./services/device-service";
import authService from "./services/auth-service";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Check if the user is in the process of Google OAuth2 authentication
  const isGoogleAuth = new URLSearchParams(location.search).has("token");

  if (!isAuthenticated && !isGoogleAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const AppContent = () => {
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const refreshToken = urlParams.get("refreshToken");

    if (token && refreshToken) {
      authService.loginGoogle(token, refreshToken);
      login();
    }

    deviceService.getDevices();
  }, [isAuthenticated, login]);

  return (
    <div className="App">
      {/* Show sidebar and top bar only if user is logged in */}
      {isAuthenticated && (
        <>
          <TopBar title="Klik Sigurnost"/>
          <Sidebar />
        </>
      )}

      <div className="Content">
        <Routes>
          {/* Routes for login and register */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dynamically render routes based on SidebarData */}
          <Route element={<ProtectedRoute />}>
            {SidebarData.map((item, index) => {
              if (item.title === "Odjava") {
                return <Route path={item.link} element={<Login />} key={index} />;
              }
              // Other routes for logged-in users
              return (
                <Route path={item.link} element={item.element} key={index} />
              );
            })}
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;