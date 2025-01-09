import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { SidebarData } from "./components/SidebarData";

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          {SidebarData.map((item) => (
            <Route path={item.link} element={item.element} />
          ))}
        </Routes>
      </div>
    </Router>
    // <div className="App">
    //   <div>
    //     <h1>Login</h1>
    //     <Login />
    //   </div>

    //   <div>
    //     <h1>Register</h1>
    //     <Register />
    //   </div>
    // </div>
  );
}

export default App;
