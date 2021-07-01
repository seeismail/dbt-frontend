/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ path, children: Component, ...props }) {
  const isAuthenticated = true;

  if (!isAuthenticated) return <Redirect to="/auth" />;

  return (
    <Route path={path} exact>
      {Component}
    </Route>
  );
}

export default PrivateRoute;
