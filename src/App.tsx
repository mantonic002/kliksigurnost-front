import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { SidebarData } from "./components/SidebarData";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import TopBar from "./components/TopBar";
import authService from "./services/auth-service";
import deviceService from "./services/device-service";
import OAuthSuccess from "./components/OAuthSuccess";

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

  // Check if the token is valid
  const isTokenValid = authService.isAuthenticated();

  if (!isAuthenticated || !isTokenValid) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      deviceService.getDevices();
    }
  }, []);

  return (
    <div className="App">
      {isAuthenticated && (
        <>
          <TopBar title="Klik Sigurnost"/>
          <Sidebar />
        </>
      )}

      <div className="Content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />

          <Route element={<ProtectedRoute />}>
            {SidebarData.map((item, index) => {
              if (item.title === "Odjava") {
                return <Route path={item.link} element={<Login />} key={index} />;
              }
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