import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { SidebarData } from "./components/SidebarData";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect } from "react";
import authService from "./services/auth-service";
import { Navigate, Outlet } from "react-router-dom";

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
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const AppContent = () => {
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const token = authService.getToken();
    if (token) authService.setTokenToApiClient(token);
    else logout();
  }, []);

  return (
    <div className="App">
      {/* Show sidebar only if user is logged in */}
      {isAuthenticated && <Sidebar />}

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
