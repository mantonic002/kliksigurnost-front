import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import logo from "./logo_final2.png";
import "./navigationStyles.css";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  let navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  const handleNavClick = () => {
    setCollapsed(true);  // This will collapse the navbar when a link is clicked
  };

  return (
    // Removed "py-0" so default Bootstrap spacing can apply
    <Navbar expand="lg" className="bg-light shadow w-100 fixed-top">
      <Navbar.Brand as={Link} to="/" className="ms-4 d-flex align-items-center">
        <img
          src={logo}
          alt="Logo"
          className="img-fluid"
          style={{ maxWidth: "100%", maxHeight: "60px" }}
        />
      </Navbar.Brand>
      <Navbar.Toggle 
        aria-controls="basic-navbar-nav"
        onClick={() => setCollapsed(!collapsed)} 
      />
      <Navbar.Collapse id="basic-navbar-nav" in={!collapsed}>
        <Nav className="me-auto justify-content-center w-100">
          <Nav.Link
            as={Link}
            to="/"
            className="custom-nav-link"
            style={{ fontFamily: "Montserrat, sans-serif" }}
            onClick={handleNavClick}
          >
            Početna
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/podesavanje"
            className="custom-nav-link special"
            style={{ fontFamily: "Montserrat, sans-serif" }}
            onClick={handleNavClick}
          >
            Detaljan vodič
          </Nav.Link>
          <NavDropdown
            title="Korisni saveti"
            id="basic-nav-dropdown"
            className="text-green custom-dropdown-title"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "bold",
              border: "1px solid #ccc",
            }}
          >
            <NavDropdown.Item
              as={Link}
              to="/saveti/zastoks"
              className="custom-dropdown-item"
              onClick={handleNavClick}
            >
              <img src={logo} alt="" className="dropdown-icon" />
              Zašto KlikSigurnost
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/saveti/rizici"
              className="custom-dropdown-item"
              onClick={handleNavClick}
            >
              <img src={logo} alt="" className="dropdown-icon" />
              Skriveni Rizici digitalnog sveta
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/saveti/razgovor"
              className="custom-dropdown-item"
              onClick={handleNavClick}
            >
              <img src={logo} alt="" className="dropdown-icon" />
              Razgovor sa decom o sigurnosti na internetu
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/saveti/pravila"
              className="custom-dropdown-item"
              onClick={handleNavClick}
            >
              <img src={logo} alt="" className="dropdown-icon" />
              10 osnovnih pravila u Vašem domu
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/saveti/podesavanje"
              className="custom-dropdown-item"
              onClick={handleNavClick}
            >
              <img src={logo} alt="" className="dropdown-icon" />
              Podešavanje KlikSigurnost alata prema uzrastu
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/saveti/sajtovi"
              className="custom-dropdown-item"
              onClick={handleNavClick}
            >
              <img src={logo} alt="" className="dropdown-icon" />
              Preporuke za edukativne sajtove na srpskom
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/saveti/trikovi"
              className="custom-dropdown-item"
              onClick={handleNavClick}
            >
              <img src={logo} alt="" className="dropdown-icon" />
              Mudri načini da budete u toku
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            as={Link}
            to="/kontakt"
            className="custom-nav-link"
            style={{ fontFamily: "Montserrat, sans-serif", color: "green" }}
            onClick={handleNavClick}
          >
            Kontakt
          </Nav.Link>
        </Nav>
        <div className="d-flex flex-column align-items-end gap-1 me-4 button-group">
          <Button
            onClick={() => {
              handleNavClick();
              navigate("/registracija");
            }}
            variant="primary"
            className="w-100 btn-desktop-small"
          >
            Registracija
          </Button>
          <Button
            onClick={() => {
              handleNavClick();
              navigate("/prijava");
            }}
            variant="outline-primary"
            className="w-100 btn-desktop-small"
          >
            Prijavljivanje
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
