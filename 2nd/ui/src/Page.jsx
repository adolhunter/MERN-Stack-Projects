import React from 'react';
// import { Navbar, Nav } from 'react-router-dom';
import {
  Navbar, Nav, OverlayTrigger, Tooltip, Container,
} from 'react-bootstrap';
import Contents from './Contents.jsx';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Issue Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/issues">Issue List</Nav.Link>
          <Nav.Link href="/report">Report</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav>
        <Nav.Link>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>Create Issue</Tooltip>}>
            <i className="fas fa-plus" />
          </OverlayTrigger>
        </Nav.Link>
        {'  '}
        <Nav.Link>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>about this app</Tooltip>}>
            <i className="fas fa-info-circle" />
          </OverlayTrigger>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

function Footer() {
  return (
    <small>
      <p className="text-center">
        Full source code available at this
        {' '}
        <a href="https://github.com/adolhunter/MERN-Stack-Projects/tree/master/2nd">
          GitHub Repository
        </a>
      </p>
    </small>
  );
}
export default function page() {
  return (
    <div>
      <NavBar />
      <Container fluid>
        <Contents />
      </Container>
      <Footer />
    </div>
  );
}
