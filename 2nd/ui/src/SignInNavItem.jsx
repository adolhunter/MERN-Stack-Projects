import React from 'react';
import { Nav, Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class SignInNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
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
    let googleToken;
    // const { showMessage } = this.props;
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      googleToken = googleUser.getAuthResponse().id_token;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`Error authenticating with Google: ${error.error}`);
    }
    try {
      const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
      const response = await fetch(`${apiEndpoint}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ google_token: googleToken }),
      });
      const body = await response.text();
      const result = JSON.parse(body);
      const { signedIn, givenName } = result;
      const { onUserChange } = this.props;
      onUserChange({ signedIn, givenName });
    } catch (error) {
      console.log(`Error signing into the app: ${error}`);
    }
  }

  async signOut() {
    const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
    try {
      await fetch(`${apiEndpoint}/signout`, {
        method: 'POST',
        credentials: 'include',
      });
      const auth2 = window.gapi.auth2.getAuthInstance();
      await auth2.signOut();
      const { onUserChange } = this.props;
      onUserChange({ signedIn: false, givenName: '' });
    } catch (error) {
      console.log(error);
    }
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
    const { disabled } = this.state;
    const { user } = this.props;
    if (user.signedIn) {
      return (
        <Nav.Item onClick={this.signOut} title={user.givenName} id="user">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Sign Out</Tooltip>}
            delay={{ show: 100, hide: 100 }}
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
