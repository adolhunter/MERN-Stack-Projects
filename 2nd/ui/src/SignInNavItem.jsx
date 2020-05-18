import React from 'react';
import { Nav, Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class SignInNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      user: { signedIn: false, givenName: '' },
      disabled: true,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    const clientId = window.ENV.GOOGLE_CLIENT_ID;
    if (!clientId) return;
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({ client_id: clientId }).then(() => {
          this.setState({ disabled: false });
        });
      }
    });
  }

  async signIn() {
    this.hideModal();
    // const { showMessage } = this.props;
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      if (googleUser) console.log('success!');
      const givenName = googleUser.getBasicProfile().getGivenName();
      this.setState({ user: { signedIn: true, givenName } });
    } catch (error) {
      console.log(`Error authenticating with Google: ${error.error}`);
    }
  }

  signOut() {
    this.setState({ user: { signedIn: false, givenName: '' } });
  }

  showModal() {
    const clientId = window.ENV.GOOGLE_CLIENT_ID;
    // const { showMessage } = this.props;
    if (!clientId) {
      //   showMessage('Missing environment variable GOOGLE_CLIENT_ID');
      return;
    }
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  render() {
    const { user, disabled } = this.state;
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
            <Button variant="primary" disabled={disabled} onClick={this.signIn} size="lg" block>
              <img src="https://goo.gl/4yjp6B" alt="Sign In" />
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
