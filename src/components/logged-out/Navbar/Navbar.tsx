import { Navbar, Nav, Button, Container, Offcanvas } from "react-bootstrap";
import logo from "/images/logo_final2.png";
import CustomDropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavigationBar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  let navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-white shadow-sm py-1" fixed="top">
      <Container className="position-relative d-flex align-items-center justify-content-between">
        {/* Brand Logo */}
        <Navbar.Brand href="#" className="fs-4 fw-bold text-success">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "100%", maxHeight: "65px" }}
          />
        </Navbar.Brand>

        {/* Center Menu */}
        <div className="menu_center position-absolute start-50 translate-middle-x d-none d-lg-flex">
          <Nav className="d-flex align-items-center">
            <Nav.Link href="#" className="mx-2">
              Šta dobijate
            </Nav.Link>
            <Nav.Link href="#" className="mx-2">
              Detaljan vodič
            </Nav.Link>
            <Nav.Link href="#" className="mx-2">
              Support
            </Nav.Link>
            <CustomDropdown isMobile={false} />
            <Nav.Link href="#" className="mx-2">
              Kontakt
            </Nav.Link>
          </Nav>
        </div>

        {/* Buttons */}
        <div className="d-none d-lg-flex">
          <Button
            onClick={() => navigate("/registracija")}
            variant="outline-primary"
            className="me-2 px-3"
          >
            Registracija in
          </Button>
          <Button
            onClick={() => navigate("/prijava")}
            variant="primary"
            className="px-3"
          >
            Prijavljivanje
          </Button>
        </div>

        {/* Mobile Toggle Button */}
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          onClick={() => setShowOffcanvas(true)}
        />

        {/* Offcanvas for Mobile */}
        <Offcanvas
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <img
                src={logo}
                alt="Logo"
                className="img-fluid"
                style={{ maxWidth: "100%", maxHeight: "55px" }}
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="ms-auto d-flex flex-column">
              <Nav.Link href="#" className="mx-2">
                Šta dobijate
              </Nav.Link>
              <Nav.Link href="#" className="mx-2">
                Detaljan vodič
              </Nav.Link>
              <Nav.Link href="#" className="mx-2">
                Support
              </Nav.Link>
              <CustomDropdown isMobile={true} />
              <Nav.Link href="#" className="mx-2">
                Kontakt
              </Nav.Link>
              <Button
                onClick={() => navigate("/registracija")}
                variant="outline-primary"
                className="me-2 px-4"
              >
                Registracija in
              </Button>
              <Button
                onClick={() => navigate("/prijava")}
                variant="primary"
                className="px-4"
              >
                Prijavljivanje
              </Button>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
