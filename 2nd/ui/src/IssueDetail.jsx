import React from 'react';
import Toast from 'react-bootstrap/Toast';
import graphQLFetch from './graphQLFetch.js';

export default class IssueDetail extends React.Component {
  constructor() {
    super();
    this.state = { issue: {}, toastVisible: false, toastMessage: '' };
    this.showMessage = this.showMessage.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { id: prevId },
      },
    } = prevProps;

    const {
      match: {
        params: { id },
      },
    } = this.props;
    if (prevId !== id) {
      this.loadData();
    }
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

  async loadData() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const query = `query issue($id: Int!) {
          issue (id: $id) {
              id description
          }
      }`;

    const data = await graphQLFetch(query, { id }, this.showMessage);
    if (data) {
      this.setState({ issue: data.issue });
    } else {
      this.setState({});
    }
  }

  render() {
    const {
      issue: { description },
    } = this.state;
    const { toastVisible, toastMessage } = this.state;
    return (
      <div>
        <h3>Description</h3>
        <pre>{description}</pre>
        <Toast onClose={this.dismissToast} show={toastVisible} delay={3000} autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Issue Detail</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    );
  }
}
