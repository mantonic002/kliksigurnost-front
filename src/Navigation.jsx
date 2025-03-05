import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import logo from './logo_final2.png';
import './navigationStyles.css';
import { useState } from 'react';

function Navigation({ setActiveSection }) {
  return (
    // Removed "py-0" so default Bootstrap spacing can apply
    <Navbar expand="lg" className="bg-light shadow w-100 fixed-top">
      <Navbar.Brand href="#home" className="ms-4 d-flex align-items-center">
        <img
          src={logo}
          alt="Logo"
          className="img-fluid"
          style={{ maxWidth: '100%', maxHeight: '60px' }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto justify-content-center w-100">
          <Nav.Link
            onClick={() => setActiveSection("home")}
            href="#home"
            className="custom-nav-link"
            style={{ fontFamily: 'Montserrat, sans-serif', color: 'green' }}
          >
            Početna  
          </Nav.Link>
          <Nav.Link
            onClick={(e) => { e.preventDefault(); setActiveSection("guide"); }}
            href="#link"
            className="custom-nav-link special"
            style={{ fontFamily: 'Montserrat, sans-serif', color: 'green' }}
          >
            Detaljan vodič   
          </Nav.Link>
          <NavDropdown
            title="Korisni saveti"
            id="basic-nav-dropdown"
            className="text-green custom-dropdown-title"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' , border: '1px solid #ccc'}}
          >
            <NavDropdown.Item href="#action/3.1" className="custom-dropdown-item">
              Action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2" className="custom-dropdown-item">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3" className="custom-dropdown-item">
              Somethingbg
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4" className="custom-dropdown-item">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            onClick={() => setActiveSection("contact")}
            href="#link"
            className="custom-nav-link"
            style={{ fontFamily: 'Montserrat, sans-serif', color: 'green' }}
          >
            Kontakt 
          </Nav.Link>
        </Nav>
        <div className="d-flex flex-column align-items-end gap-1 me-4 button-group">
          <Button variant="primary" className="w-100 btn-desktop-small">
            Registracija
          </Button>
          <Button variant="outline-primary" className="w-100 btn-desktop-small">
            Prijavljivanje
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
