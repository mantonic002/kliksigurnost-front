import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { SidebarData } from "./components/SidebarData";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";

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
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      {/* Show sidebar only if user is logged in */}
      {isAuthenticated && <Sidebar />}

      <div className="Content">
        <Routes>
          {/* Routes for login and register */}
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
