import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

const IssueRow = withRouter(({
  issue, location: { search }, closeIssue, deleteIssue, index,
}) => {
  const selectLocation = { pathname: `/issues/${issue.id}`, search };
  // const closeTooltip = (
  //   <Tooltip id="tooltip-top">Close Issue</Tooltip>
  //   );
  //   cosnt deleteTooltip = (
  //     <Tooltip id="tooltip-top">Close Issue</Tooltip>
  // );
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toDateString() : ''}</td>
      <td>{issue.title}</td>
      <td>
        <Link to={`/edit/${issue.id}`}>edit</Link>
        {' | '}
        <NavLink to={selectLocation}>Select</NavLink>
        {' | '}
        <OverlayTrigger
          delayShow={1000}
          key="close"
          placement="top"
          overlay={<Tooltip>Close Issue</Tooltip>}
        >
          <Button
            variant="light"
            onClick={() => {
              closeIssue(index);
            }}
          >
            <i className="fas fa-check" />
          </Button>
        </OverlayTrigger>
        {' '}
        <OverlayTrigger
          delayShow={1000}
          key="delete"
          placement="top"
          overlay={<Tooltip>Delete Issue</Tooltip>}
        >
          <Button
            variant="light"
            onClick={() => {
              deleteIssue(index);
            }}
          >
            <i className="fas fa-trash-alt" />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
});

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
    <table className="bordered-table">
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
    </table>
  );
}
