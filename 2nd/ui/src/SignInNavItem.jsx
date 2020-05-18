import React from 'react';
import { Nav, Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class SignInNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showing: false, user: { signedIn: false, givenName: '' } };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    this.hideModal();
    this.setState({ user: { signedIn: true, givenName: 'User1' } });
  }

  signOut() {
    this.setState({ user: { signedIn: false, givenName: '' } });
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  render() {
    const { user } = this.state;
    if (user.signedIn) {
      return (
        <Nav.Item onClick={this.signOut} title={user.givenName} id="user">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Sign Out</Tooltip>}
            delay={{ show: 250, hide: 400 }}
          >
            <Nav.Link>
              <i aria-hidden className="fas fa-sign-out-alt" />
            </Nav.Link>
          </OverlayTrigger>
        </Nav.Item>
      );
    }
    const { showing } = this.state;
    return (
      <>
        <Nav.Item onClick={this.showModal}>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Sign In</Tooltip>}
            delay={{ show: 250, hide: 400 }}
          >
            <Nav.Link>
              <i aria-hidden className="fas fa-sign-in-alt" />
            </Nav.Link>
          </OverlayTrigger>
        </Nav.Item>

        <Modal show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button variant="primary" onClick={this.signIn} size="lg" block>
              Sign In
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="link" onClick={this.hideModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
