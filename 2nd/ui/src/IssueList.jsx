import React from 'react';
import { Card, Accordion, Toast } from 'react-bootstrap';
import URLSearchParams from 'url-search-params';
import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueDetail from './IssueDetail.jsx';
import graphQLFetch from './graphQLFetch.js';
import store from './store.js';

export default class IssueList extends React.Component {
  static async fetchData(match, search, showError) {
    const params = new URLSearchParams(search);
    const vars = { hasSelection: false, selectedId: 0 };
    if (params.get('status')) vars.status = params.get('status');
    const effortMin = parseInt(params.get('effortMin'), 10);
    if (!Number.isNaN(effortMin)) vars.effortMin = effortMin;
    const effortMax = parseInt(params.get('effortMax'), 10);
    if (!Number.isNaN(effortMax)) vars.effortMax = effortMax;
    const {
      params: { id },
    } = match;
    const idInt = parseInt(id, 10);
    if (!Number.isNaN(idInt)) {
      vars.hasSelection = true;
      vars.selectedId = idInt;
    }
    const query = `query issueList(
      $status: StatusType
      $effortMin: Int
      $effortMax: Int
      $hasSelection: Boolean!
      $selectedId: Int!
    ) {
      issueList(
        status: $status
        effortMin: $effortMin
        effortMax: $effortMax
      ) {
        id title status owner
        created effort due
      }
      issue(id: $selectedId) @include (if : $hasSelection) {
        id description
      }
    } `;
    const data = await graphQLFetch(query, vars, showError);
    return data;
  }

  constructor() {
    super();
    const issues = store.initialData ? store.initialData.issueList : null;
    const selectedIssue = store.initialData ? store.initialData.issue : null;
    this.state = { issues, selectedIssue, toastVisible: false, toastMessage: '' };
    this.closeIssue = this.closeIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    const { issues } = this.state;
    if (issues == null) this.loadData();
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search: prevSearch },
      match: {
        params: { id: prevId },
      },
    } = prevProps;
    const {
      location: { search },
      match: {
        params: { id },
      },
    } = this.props;
    if (prevSearch !== search || prevId !== id) {
      this.loadData();
    }
  }

  async loadData() {
    const {
      location: { search },
      match,
    } = this.props;
    const data = await IssueList.fetchData(match, search, this.showError);
    if (data) {
      this.setState({ issues: data.issueList, selectedIssue: data.issue });
    }
  }

  async closeIssue(index) {
    const query = `mutation issueClose($id: Int!) {
      issueUpdate(id: $id, changes: {status: Closed}) {
        id title status owner
        effort created due description
      }
    }
    `;
    const { issues } = this.state;
    const data = await graphQLFetch(query, { id: issues[index].id }, this.showMessage);
    if (data) {
      this.setState((prevState) => {
        const newList = [...prevState.issues];
        newList[index] = data.issueUpdate;
        return { issues: newList };
      });
    } else {
      this.loadData();
    }
  }

  async deleteIssue(index) {
    const query = `mutation issueDelete($id: Int!) {
      issueDelete(id: $id)
    }`;
    const { issues } = this.state;
    const {
      location: { pathname, search },
      history,
    } = this.props;
    const { id } = issues[index];
    const data = await graphQLFetch(query, { id }, this.showMessage);
    if (data && data.issueDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.issues];
        if (pathname === `/issues/${id}`) {
          history.push({ pathname: '/issues', search });
        }
        newList.splice(index, 1);
        return { issues: newList };
      });
      this.showMessage(`Deleted issue ${id} successfully!`);
    } else {
      this.loadData();
    }
  }

  showMessage(message) {
    this.setState({ toastVisible: true, toastMessage: message });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  render() {
    const { issues, toastVisible, toastMessage } = this.state;
    if (issues == null) return null;
    const { selectedIssue } = this.state;
    return (
      <>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" id="filter-toggle">
              Filter
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <IssueFilter />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <IssueTable issues={issues} closeIssue={this.closeIssue} deleteIssue={this.deleteIssue} />
        <IssueDetail issue={selectedIssue} />
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
