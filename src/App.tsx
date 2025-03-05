import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/logged-in/Sidebar";
import { SidebarData } from "./components/logged-in/SidebarData";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/logged-in/Login";
import Register from "./components/logged-in/Register";
import { useEffect } from "react";
import authService from "./services/auth-service";

function App() {
  return (
    <AuthProvider>
      {/* Wrap the app with AuthProvider */}
      <Router>
        <AppContent />
        {/* Use a new component to handle authentication logic */}
      </Router>
    </AuthProvider>
  );
}

const AppContent = () => {
  const {isAuthenticated, logout } = useAuth();

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
          {SidebarData.map((item, index) => {
            if (item.title === "Odjava") {
              return <Route path={item.link} element={<Login />} key={index} />;
            }
            // Other routes for logged-in users
            return (
              <Route path={item.link} element={item.element} key={index} />
            );
          })}
        </Routes>
      </div>
    </div>
  );
};

export default App;
