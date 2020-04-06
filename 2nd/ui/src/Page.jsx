import React from 'react';

import Contents from './Contents.jsx';

function NavBar() {
  return (
    <nav>
      <a href="/">Home</a>
      {' | '}
      <a href="/#/issues">Issues</a>
      {' | '}
      <a href="/#/report">Report</a>
    </nav>
  );
}

export default function page() {
  return (
    <div>
      <NavBar />
      <Contents />
    </div>
  );
}
