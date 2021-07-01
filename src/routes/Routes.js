import React from 'react';
import { Route } from 'react-router-dom';
import { allRoutes } from './index';
import PrivateRoute from './route';
import Layout from '../layout';

function Routes() {
  return allRoutes.map(function (currentRoute) {
    let CalculatedRoute = PrivateRoute;

    if (currentRoute.public) CalculatedRoute = Route;

    const Component = currentRoute.component;

    return (
      <CalculatedRoute key={currentRoute.path} path={currentRoute.path} exact>
        {currentRoute.public ? (
          <Component />
        ) : (
          <Layout>
            <Component />
          </Layout>
        )}
      </CalculatedRoute>
    );
  });
}

export default Routes;
