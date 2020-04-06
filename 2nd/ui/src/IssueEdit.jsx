import React from 'react';

export default function IssueEdit({ match }) {
  const { id } = match.params;
  return <h2>{`This is a place holder for editing issue ${id}`}</h2>;
}
