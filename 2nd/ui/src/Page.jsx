import React from 'react';
import { Navbar, Nav, OverlayTrigger, Tooltip, Container } from 'react-bootstrap';
import IssueAddNavItem from './IssueAddNavItem.jsx';
import Contents from './Contents.jsx';
import SignInNavItem from './SignInNavItem.jsx';
import UserContext from './UserContext.js';

function NavBar({ user, onUserChange }) {
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
        <IssueAddNavItem user={user} />
        <SignInNavItem user={user} onUserChange={onUserChange} />
        <Nav.Item>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>about this app</Tooltip>}>
            <Nav.Link href="/about">
              <i aria-hidden className="fas fa-info-circle" />
            </Nav.Link>
          </OverlayTrigger>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

function Footer() {
  return (
    <small>
      <hr />
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
export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { signedIn: false } };
    this.onUserChange = this.onUserChange.bind(this);
  }

  async componentDidMount() {
    const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
    const response = await fetch(`${apiEndpoint}/user`, {
      method: 'POST',
      credentials: 'include',
    });
    const body = await response.text();
    const result = JSON.parse(body);
    const { signedIn, givenName } = result;
    this.setState({ user: { signedIn, givenName } });
  }

  onUserChange(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <NavBar user={user} onUserChange={this.onUserChange} />
        <Container fluid>
          <UserContext.Provider value={user}>
            <Contents />
          </UserContext.Provider>
        </Container>
        <Footer />
      </div>
    );
  }
}
