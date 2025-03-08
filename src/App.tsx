import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./styles/global.css";
import { SidebarData } from "./components/logged-in/SidebarData";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/logged-out/Login/Login";
import authService from "./services/auth-service";
import deviceService from "./services/device-service";
import TopBar from "./components/logged-in/TopBar";
import OAuthSuccess from "./components/logged-in/OAuthSuccess";
import Signup from "./components/logged-out/SignUp/SignUp";
import Concerns from "./components/logged-out/Concerns/Concerns";
import Footer from "./components/logged-out/Footer/Footer";
import Hero from "./components/logged-out/Hero/Hero";
import MadeEasy from "./components/logged-out/madeeasy/MadeEasy";
import ProjectTabs from "./components/logged-out/tabsproject/ProjectsTabs";
import TestimonialSlider from "./components/logged-out/Testimonial/Testimonial";
import Navbar from "./components/logged-out/Navbar/Navbar";

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
      {isAuthenticated ? (
        <>
          <TopBar title="Klik Sigurnost" />
        </>
      ) : (
        <Navbar />
      )}

      <div className="Content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ProjectTabs />
                <MadeEasy />
                <Concerns />
                <TestimonialSlider />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />

          <Route element={<ProtectedRoute />}>
            {SidebarData.map((item, index) => {
              if (item.title === "Odjava") {
                return (
                  <Route path={item.link} element={<Login />} key={index} />
                );
              }
              return (
                <Route path={item.link} element={item.element} key={index} />
              );
            })}
          </Route>
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
