import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from './routes.js';

export default function content() {
  return (
    <Switch>
      <Redirect exact from="/" to="/issues" />
      {routes.map((attrs) => (
        <Route path={attrs.path} component={attrs.component} key={attrs.path} />
      ))}
    </Switch>
  );
}
