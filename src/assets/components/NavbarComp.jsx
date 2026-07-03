import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../img/netflix-logo.png";

function NavbarComp() {
  return (
    <Navbar className="navbar" data-bs-theme="dark">
      <Container fluid>
        <Nav>
          <Navbar.Brand href="#home">
            <img src={logo} alt="Netflix logo image" />
          </Navbar.Brand>
          <Nav className="">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features" className="text-white">
              TV Shows
            </Nav.Link>
            <Nav.Link href="#pricing">Movies</Nav.Link>
            <Nav.Link href="#pricing">Recently Added</Nav.Link>
            <Nav.Link href="#pricing">My List</Nav.Link>
          </Nav>
        </Nav>
        <Nav>
          <Nav.Link className="navbar-icons">
            <i className="bi bi-search"></i>
          </Nav.Link>
          <Nav.Link className="text-white">KIDS</Nav.Link>
          <Nav.Link className="navbar-icons">
            <i className="bi bi-bell-fill"></i>
          </Nav.Link>
          <Nav.Link className="navbar-icons">
            <i className="bi bi-person-fill"></i>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
