import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Form,
  Col,
  Row,
  Button,
  ButtonToolbar,
  FormControl,
  Alert,
  Toast,
} from 'react-bootstrap';

import graphQLFetch from './graphQLFetch.js';
import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';
import TextInput from './TextInput.jsx';

export default class IssueEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      issue: {},
      invalidFields: {},
      showingValidation: false,
      toastVisible: false,
      toastMessage: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showToast = this.showToast.bind(this);
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
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState((prevState) => ({
      issue: { ...prevState.issue, [name]: value },
    }));
  }

  onValidityChange(event, valid) {
    const { name } = event.target;
    this.setState((prevState) => {
      const invalidFields = { ...prevState.invalidFields, [name]: !valid };
      if (valid) delete invalidFields[name];
      return { invalidFields };
    });
  }

  showValidation() {
    this.setState({ showingValidation: true });
  }

  dismissValidation() {
    this.setState({ showingValidation: false });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.showValidation();
    const { issue, invalidFields } = this.state;
    if (Object.keys(invalidFields).length !== 0) return;
    const query = `mutation issueUpdate(
      $id: Int!
      $changes: IssueUpdateInputs!
    ) {
      issueUpdate(
        id: $id
        changes: $changes
      ) {
        id title status owner
        effort created due description
      }}`;

    const { id, created, ...changes } = issue;
    const data = await graphQLFetch(query, { changes, id }, this.showToast);
    if (data) {
      this.setState({ issue: data.issueUpdate });
      // eslint-disable-next-line no-alert
      this.showToast('Updated issue successfully!');
    }
  }

  async loadData() {
    const query = `query issue($id: Int!) {
      issue(id: $id) {
        id title status owner
        effort created due description
      }
    }`;

    const {
      match: {
        params: { id },
      },
    } = this.props;
    const data = await graphQLFetch(query, { id }, this.showToast);
    this.setState({ issue: data ? data.issue : {}, invalidFields: {} });
  }

  showToast(message) {
    this.setState({
      toastVisible: true,
      toastMessage: message,
    });
  }

  dismissToast() {
    this.setState({
      toastVisible: false,
    });
  }

  render() {
    const {
      issue: { id },
    } = this.state;
    const {
      match: {
        params: { id: propsId },
      },
    } = this.props;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`Issue with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }

    const { invalidFields, showingValidation } = this.state;
    let validationMessage;
    if (Object.keys(invalidFields).length !== 0 && showingValidation) {
      validationMessage = (
        <Alert variant="danger" onClose={this.dismissValidation} dismissible>
          Please correct invalid fields before submitting!
        </Alert>
      );
    }

    const {
      issue: { title, status },
    } = this.state;
    const {
      issue: { owner, effort, description },
    } = this.state;
    const {
      issue: { created, due },
    } = this.state;
    const { toastVisible, toastMessage } = this.state;

    return (
      <Card>
        <Card.Header>{`Editing issue: ${id}`}</Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Created
              </Form.Label>
              <Col sm={9}>
                <Form.Control plaintext readOnly defaultValue={created.toDateString()} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Status
              </Form.Label>
              <Col sm={9}>
                <Form.Control as="select" value={status} name="status" onChange={this.onChange}>
                  <option value="New">New</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Closed">Closed</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Owner
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  value={owner}
                  name="owner"
                  onChange={this.onChange}
                  key={id}
                  as={TextInput}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Effort
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  value={effort}
                  name="effort"
                  onChange={this.onChange}
                  key={id}
                  as={NumInput}
                />
              </Col>
            </Form.Group>

            <Form.Group validationstate={invalidFields.due ? 'error' : null} as={Row}>
              <Form.Label column sm={3}>
                Due
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  value={due}
                  name="due"
                  onChange={this.onChange}
                  onValidityChange={this.onValidityChange}
                  key={id}
                  as={DateInput}
                  placeholder="e.g, 2019/01/01"
                />
                <FormControl.Feedback />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Title
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  size={50}
                  value={title}
                  name="title"
                  onChange={this.onChange}
                  key={id}
                  as={TextInput}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Description
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  rows="5"
                  value={description}
                  name="description"
                  onChange={this.onChange}
                  key={id}
                  as={TextInput}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 6, offset: 3 }}>
                <ButtonToolbar>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <Link to="/issues">
                    <Button variant="link">Back</Button>
                  </Link>
                </ButtonToolbar>
              </Col>
            </Form.Group>
            <Form.Group>
              <Col sm={9} offset={3}>
                {validationMessage}
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>

        <Toast show={toastVisible} delay={3000} autohide onClose={this.dismissToast}>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Update Status</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>

        <Card.Footer className="text-muted">
          <Link to={`/edit/${id - 1}`}>Prev</Link>
          {' | '}
          <Link to={`/edit/${id + 1}`}>Next</Link>
        </Card.Footer>
      </Card>
    );
  }
}

// <form onSubmit={this.handleSubmit}>
//   <h3>{`Editing issue: ${id}`}</h3>
//   <table>
//     <tbody>
//       <tr>
//         <td>Created:</td>
//         <td>{created.toDateString()}</td>
//       </tr>
//       <tr>
//         <td>Status:</td>
//         <td>
//           <select name="status" value={status} onChange={this.onChange}>
//             <option value="New">New</option>
//             <option value="Assigned">Assigned</option>
//             <option value="Fixed">Fixed</option>
//             <option value="Closed">Closed</option>
//           </select>
//         </td>
//       </tr>
//       <tr>
//         <td>Owner:</td>
//         <td>
//           <TextInput name="owner" value={owner} onChange={this.onChange} key={id} />
//         </td>
//       </tr>
//       <tr>
//         <td>Effort:</td>
//         <td>
//           <NumInput name="effort" value={effort} onChange={this.onChange} key={id} />
//         </td>
//       </tr>
//       <tr>
//         <td>Due:</td>
//         <td>
//           <DateInput
//             name="due"
//             value={due}
//             onChange={this.onChange}
//             onValidityChange={this.onValidityChange}
//             key={id}
//           />
//         </td>
//       </tr>
//       <tr>
//         <td>Title:</td>
//         <td>
//           <TextInput size={50} name="title" value={title} onChange={this.onChange} key={id} />
//         </td>
//       </tr>
//       <tr>
//         <td>Description:</td>
//         <td>
//           <TextInput
//             tag="textarea"
//             rows={8}
//             cols={50}
//             name="description"
//             value={description}
//             onChange={this.onChange}
//             key={id}
//           />
//         </td>
//       </tr>
//       <tr>
//         <td />
//         <td>
//           <button type="submit">Submit</button>
//         </td>
//       </tr>
//     </tbody>
//   </table>
//   {validationMessage}
//   <Link to={`/edit/${id - 1}`}>Prev</Link>
//   {' | '}
//   <Link to={`/edit/${id + 1}`}>Next</Link>
// </form>
