import "bootstrap/dist/css/bootstrap.min.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import logo from "./logo_final2.png";
import "./navigationStyles.css";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  let navigate = useNavigate();

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
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto justify-content-center w-100">
          <Nav.Link
            as={Link}
            to="/"
            className="custom-nav-link"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Početna
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/vodic"
            className="custom-nav-link special"
            style={{ fontFamily: "Montserrat, sans-serif" }}
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
            >
              <img src={logo} alt="" className="dropdown-icon" />
              Zašto KlikSigurnost
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/saveti/rizici"
              className="custom-dropdown-item"
            >
              <img src={logo} alt="" className="dropdown-icon" />
              Skriveni Rizici digitalnog sveta
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/saveti/razgovor"
              className="custom-dropdown-item"
            >
              <img src={logo} alt="" className="dropdown-icon" />
              Razgovor sa decom o sigurnosti na internetu
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/saveti/pravila"
              className="custom-dropdown-item"
            >
              <img src={logo} alt="" className="dropdown-icon" />
              10 osnovnih pravila u vašem domu
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/saveti/podesavanje"
              className="custom-dropdown-item"
            >
              <img src={logo} alt="" className="dropdown-icon" />
              Podešavanje KlikSigurnost alata prema uzrastu
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/saveti/sajtovi"
              className="custom-dropdown-item"
            >
              <img src={logo} alt="" className="dropdown-icon" />
              Preporuke za edukativne sajtove na srpskom
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/saveti/fore"
              className="custom-dropdown-item"
            >
              <img src={logo} alt="" className="dropdown-icon" />
              Fore i fazoni za roditelje
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            as={Link}
            to="/kontakt"
            className="custom-nav-link"
            style={{ fontFamily: "Montserrat, sans-serif", color: "green" }}
          >
            Kontakt
          </Nav.Link>
        </Nav>
        <div className="d-flex flex-column align-items-end gap-1 me-4 button-group">
          <Button
            onClick={() => navigate("/registracija")}
            variant="primary"
            className="w-100 btn-desktop-small"
          >
            Registracija
          </Button>
          <Button
            onClick={() => navigate("/prijava")}
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
