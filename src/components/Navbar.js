import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function DeliveryNavbar() {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="mb-4"
      style={{ width: "100%" }}
    >
      <Container fluid>
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <img
            src="/moustache-image.svg"
            width="50"
            height="50"
            className="d-inline-block align-top me-2"
            alt="Delivery Logo"
          />
          Bigode Express
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">Sobre</Nav.Link>
            <Nav.Link href="#services">Serviços</Nav.Link>
            <Nav.Link href="#contact">Contato</Nav.Link>
          </Nav>
          <Button variant="outline-success" href="#order-now">
            Peça Agora
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DeliveryNavbar;
