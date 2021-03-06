/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Tooltip, OverlayTrigger, Table } from 'react-bootstrap';
import UserContext from './UserContext.js';

class IssueRowPlain extends React.Component {
  render() {
    const {
      issue,
      location: { search },
      closeIssue,
      deleteIssue,
      index,
    } = this.props;
    const user = this.context;
    const disabled = !user.signedIn;
    const selectLocation = { pathname: `/issues/${issue.id}`, search };
    const editTooltip = (
      <Tooltip id="close-tooltip" placement="top">
        Edit Issue
      </Tooltip>
    );
    function onClose(e) {
      e.preventDefault();
      closeIssue(index);
    }

    function onDelete(e) {
      e.preventDefault();
      deleteIssue(index);
    }

    const tableRow = (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.due ? issue.due.toDateString() : ''}</td>
        <td>{issue.title}</td>
        <td>
          <Link to={`/edit/${issue.id}`}>
            <OverlayTrigger delayShow={1000} overlay={editTooltip}>
              <Button variant="light">
                <i aria-hidden className="fas fa-edit" />
              </Button>
            </OverlayTrigger>
          </Link>
          {' '}
          <OverlayTrigger
            delayShow={1000}
            key="close"
            placement="top"
            overlay={<Tooltip>Close Issue</Tooltip>}
          >
            <Button variant="light" onClick={onClose} disabled={disabled}>
              <i aria-hidden className="fas fa-check" />
            </Button>
          </OverlayTrigger>
          {' '}
          <OverlayTrigger
            delayShow={1000}
            key="delete"
            placement="top"
            overlay={<Tooltip>Delete Issue</Tooltip>}
          >
            <Button variant="light" onClick={onDelete} disabled={disabled}>
              <i aria-hidden className="fas fa-trash-alt" />
            </Button>
          </OverlayTrigger>
        </td>
      </tr>
    );
    return <LinkContainer to={selectLocation}>{tableRow}</LinkContainer>;
  }
}

IssueRowPlain.contextType = UserContext;
const IssueRow = withRouter(IssueRowPlain);
delete IssueRow.contextType;

export default function IssueTable({ issues, closeIssue, deleteIssue }) {
  const issueRows = issues.map((issue, index) => (
    <IssueRow
      key={issue.id}
      issue={issue}
      closeIssue={closeIssue}
      index={index}
      deleteIssue={deleteIssue}
    />
  ));

  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Due Date</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </Table>
  );
}
