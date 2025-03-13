import { NavDropdown, Container } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa"; // Import the arrow icon
import { useState } from 'react';

interface DropdownProps {
  isMobile: Boolean;
}

const CustomDropdown = ({ isMobile }: DropdownProps) => {
  const [show, setShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavDropdown
        title={
          <div className="d-flex align-items-center">
            Korisni saveti
            <FaChevronDown
              className="ms-2"
              style={{
                transition: "transform 0.3s ease",
                transform: isHovered ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
        }
        show={!isMobile ? show : undefined}
        onMouseEnter={!isMobile ? () => setShow(true) : undefined}
        onMouseLeave={!isMobile ? () => setShow(false) : undefined}
        className="mx-2"
      >
        {/* Responsive for Mobile */}
        {isMobile ? (
          <>
            <NavDropdown.Item href="#" className="py-2">
              Action
            </NavDropdown.Item>
            <NavDropdown.Item href="#" className="py-2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#" className="py-2">
              Somethingbg
            </NavDropdown.Item>
            <NavDropdown.Item href="#" className="py-2">
              Separated link
            </NavDropdown.Item>
          </>
        ) : (
          <Container fluid className="dropdown-menu-container bg-white">
            <NavDropdown.Item
              href="#action/3.1"
              className="custom-dropdown-item"
            >
              Action
            </NavDropdown.Item>
            <NavDropdown.Item
              href="#action/3.2"
              className="custom-dropdown-item"
            >
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item
              href="#action/3.3"
              className="custom-dropdown-item"
            >
              Somethingbg
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              href="#action/3.4"
              className="custom-dropdown-item"
            >
              Separated link
            </NavDropdown.Item>
          </Container>
        )}
      </NavDropdown>
    </div>
  );
};

export default CustomDropdown;
