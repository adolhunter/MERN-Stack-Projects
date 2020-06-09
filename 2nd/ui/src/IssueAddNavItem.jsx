import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Nav,
  Modal,
  Form,
  Button,
  OverlayTrigger,
  Toast,
  FormControl,
  FormGroup,
  FormLabel,
  ButtonToolbar,
  Tooltip,
} from 'react-bootstrap';

import graphQLFetch from './graphQLFetch.js';

class IssueAddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      toastVisible: false,
      toastMessage: '',
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  showMessage(message) {
    this.setState({
      toastVisible: true,
      toastMessage: message,
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.hideModal();
    const form = document.forms.IssueAdd;
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
    };
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue }, this.showError);
    if (data) {
      const { history } = this.props;
      history.push(`/edit/${data.issueAdd.id}`);
    }
  }

  render() {
    const { showing } = this.state;
    const { user: { signedIn } } = this.props;
    const { toastVisible, toastMessage } = this.state;
    return (
      <>
        <Nav.Item onClick={this.showModal}>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Create Issue</Tooltip>}
            delay={{ show: 250, hide: 400 }}
          >
            <Nav.Link disabled={!signedIn}>
              <i aria-hidden className="fas fa-plus" />
            </Nav.Link>
          </OverlayTrigger>
        </Nav.Item>

        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Issue</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form name="IssueAdd">
              <FormGroup>
                <FormLabel>Title:</FormLabel>
                <FormControl name="title" autoFocus />
              </FormGroup>
              <FormGroup>
                <FormLabel>Owner:</FormLabel>
                <FormControl autoFocus name="owner" />
              </FormGroup>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <ButtonToolbar>
              <Button type="button" variant="primary" onClick={this.handleSubmit}>
                Submit
              </Button>
              <Button variant="link" onClick={this.hideModal}>
                Cancel
              </Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>

        <Toast
          show={toastVisible}
          delay={3000}
          autohide
          onClose={this.dismissToast}
          style={{
            position: 'absolute',
            top: 100,
            right: 0,
          }}
        >
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Add Status</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </>
    );
  }
}

export default withRouter(IssueAddNavItem);
