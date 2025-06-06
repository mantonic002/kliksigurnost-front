import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./styles/global-in.css";
import "./styles/global-out.css";
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
import Navigation from "./Navigation";
import PodesavanjePremaUzrastu from "./components/logged-out/Blog/PodesavanjePremaUzrastu";
import RazgovorSaDecom from "./components/logged-out/Blog/RazgovorSaDecom";
import SkriveniRizici from "./components/logged-out/Blog/SkriveniRizici";
import ZastoKlikSigurnost from "./components/logged-out/Blog/ZastoKlikSigurnost";
import AdminDashboard from "./components/logged-in/admin/AdminDashboard";
import { ToastContainer } from "react-toastify";
import ForgottenPassword from "./components/logged-out/ForgottenPassword/ForgottenPassword";
import ResetPassword from "./components/logged-out/ResetPassword/ResetPassword";
import Home from "./components/logged-in/Home";
import Pravila from "./components/logged-out/Blog/Pravila";
import Contact from "./components/logged-out/Contact/Contact";
import FooterLoggedIn from "./components/logged-in/FooterLoggedIn";
import Privacy from "./components/logged-out/Terms/Privacy";
import Terms from "./components/logged-out/Terms/Terms";
import EdukativniSajtovi from "./components/logged-out/Blog/EdukativniSajtovi";
import Trikovi from "./components/logged-out/Blog/Trikovi";
import ScrollToTop from "./components/utils/ScrollToTop";
import Setup from "./components/logged-out/Setup/Setup";

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
    return <Navigate to="/prijava" replace />;
  }

  return <Outlet />;
};

const LoggedOutRoute = () => {
  const { isAuthenticated } = useAuth();
  const isTokenValid = authService.isAuthenticated();

  if (isAuthenticated && isTokenValid) {
    return <Navigate to="/pocetna" replace />;
  }

  return <Outlet />;
};

const AdminRoute = () => {
  const { isAuthenticated, profile } = useAuth();
  const isTokenValid = authService.isAuthenticated();

  if (!isAuthenticated || !isTokenValid || profile?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
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
    <div className={`App ${isAuthenticated ? "logged-in" : "logged-out"}`}>
      {isAuthenticated ? (
        <>
          <TopBar />
        </>
      ) : (
        <Navigation />
      )}
      {/* Content takes up the remaining space */}
      <div className="Content">
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <Home />
                </>
              ) : (
                <>
                  <Hero />
                  <ProjectTabs />
                  <MadeEasy />
                  <Concerns />
                  <TestimonialSlider />
                  <Signup />
                </>
              )
            }
          />
          <Route element={<LoggedOutRoute />}>
            <Route path="/prijava" element={<Login />} />
            <Route path="/registracija" element={<Signup />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
            <Route
              path="/zaboravljena-lozinka"
              element={<ForgottenPassword />}
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/vodic"
              element={
                <>
                  <PodesavanjePremaUzrastu />
                </>
              }
            />
            <Route
              path="/saveti/zastoks"
              element={
                <>
                  <ZastoKlikSigurnost />
                </>
              }
            />
            <Route
              path="/saveti/rizici"
              element={
                <>
                  <SkriveniRizici />
                </>
              }
            />
            <Route
              path="/saveti/razgovor"
              element={
                <>
                  <RazgovorSaDecom />
                </>
              }
            />
            <Route
              path="/saveti/pravila"
              element={
                <>
                  <Pravila />
                </>
              }
            />
            <Route
              path="/saveti/podesavanje"
              element={
                <>
                  <PodesavanjePremaUzrastu />
                </>
              }
            />
            <Route
              path="/saveti/sajtovi"
              element={
                <>
                  <EdukativniSajtovi />
                </>
              }
            />
            <Route
              path="/saveti/trikovi"
              element={
                <>
                  <Trikovi />
                </>
              }
            />
            <Route
              path="/kontakt"
              element={
                <>
                  <Contact />
                </>
              }
            />
            <Route
              path="/uslovi"
              element={
                <>
                  <Terms />
                </>
              }
            />{" "}
            <Route
              path="/privatnost"
              element={
                <>
                  <Privacy />
                </>
              }
            />
            <Route
            path="/podesavanje"
            element={
              <>
                <Setup />
              </>
            }
            />
            </Route>
          {/* Admin routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          {/* Loged in user routes */}
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
      </div>

      {isAuthenticated && <FooterLoggedIn />}
      {!isAuthenticated && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
