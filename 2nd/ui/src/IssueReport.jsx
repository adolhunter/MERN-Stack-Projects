import React from 'react';
import { Table, Card, Accordion, Toast } from 'react-bootstrap';

import IssueFilter from './IssueFilter.jsx';
import graphQLFetch from './graphQLFetch.js';
import store from './store.js';

const statuses = ['New', 'Assigned', 'Fixed', 'Closed'];

export default class IssueReport extends React.Component {
  static async fetchData(match, search, showError) {
    const params = new URLSearchParams(search);
    const vars = {};
    if (params.get('status')) vars.status = params.get('status');

    const effortMin = parseInt(params.get('effortMin'), 10);
    if (!Number.isNaN(effortMin)) vars.effortMin = effortMin;
    const effortMax = parseInt(params.get('effortMax'), 10);
    if (!Number.isNaN(effortMax)) vars.effortMax = effortMax;

    const query = `query issueList(
      $status: StatusType
      $effortMin: Int
      $effortMax: Int
    ) {
      issueCounts(
        status: $status
        effortMin: $effortMin
        effortMax: $effortMax
      ) {
        owner New Assigned Fixed Closed
      }
    }`;
    const data = await graphQLFetch(query, vars, showError);
    return data;
  }

  constructor(props) {
    super(props);
    const stats = store.initialData ? store.initialData.issueCounts : null;
    delete store.initialData;
    this.state = { stats, toastMessage: '', toastVisible: false };
    this.dismissToast = this.dismissToast.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  componentDidMount() {
    const { stats } = this.state;
    if (stats == null) this.loadData();
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search: prevSearch },
    } = prevProps;
    const {
      location: { search },
    } = this.props;
    if (prevSearch !== search) {
      this.loadData();
    }
  }

  showMessage(message) {
    this.setState({ toastMessage: message, toastVisible: true });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  async loadData() {
    const {
      location: { search },
      match,
      showError,
    } = this.props;
    const data = await IssueReport.fetchData(match, search, showError);
    if (data) {
      this.setState({ stats: data.issueCounts });
    }
  }

  render() {
    const { stats, toastVisible, toastMessage } = this.state;
    if (stats == null) return null;

    const headerColumns = statuses.map((status) => <th key={status}>{status}</th>);

    const statRows = stats.map((counts) => (
      <tr key={counts.owner}>
        <td>{counts.owner}</td>
        {statuses.map((status) => (
          <td key={status}>{counts[status]}</td>
        ))}
      </tr>
    ));

    return (
      <>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" id="filter-toggle">
              Filter
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <IssueFilter urlBase="/report" />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th> </th>
              {headerColumns}
            </tr>
          </thead>
          <tbody>{statRows}</tbody>
        </Table>
        <Toast onClose={this.dismissToast} show={toastVisible} delay={3000} autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Update Status</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </>
    );
  }
}
