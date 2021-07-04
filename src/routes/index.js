import React from 'react';
import { Redirect } from 'react-router-dom';

const Auth = React.lazy(() => import('../containers/Auth'));
const Dashboard = React.lazy(() => import('../containers/Dashboard'));
const Chefs = React.lazy(() => import('../containers/Chefs'));
const Waiters = React.lazy(() => import('../containers/Waiters'));
const Customers = React.lazy(() => import('../containers/Customers'));
const Orders = React.lazy(() => import('../containers/Orders'));
const Profile = React.lazy(() => import('../containers/Profile'));
const Meals = React.lazy(() => import('../containers/Meals'));

export const sidebarRoutes = [
  {
    path: '/dashboard',
    component: Dashboard,
    title: 'Dashboard',
  },
  {
    title: 'Contacts',
    routes: [
      {
        path: '/contacts/chefs',
        component: Chefs,
        title: 'Chef',
      },
      {
        path: '/contacts/waiters',
        component: Waiters,
        title: 'Waiter',
      },
      {
        path: '/contacts/customers',
        component: Customers,
        title: 'Customer',
      },
    ],
  },
  {
    path: '/orders',
    component: Orders,
    title: 'Orders',
  },
  { path: '/meals', component: Meals, title: 'Meals' },
];

export const hiddenRoutes = [
  {
    path: '/auth',
    component: Auth,
    public: true,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/',
    component: () => <Redirect to="/dashboard" />,
  },
];

function flattenRoutes(r) {
  const routes = [];
  r.forEach((currRoute) => {
    // THIS IS CONTACTS MULTI LEVEL ROUTE
    if (!currRoute.component) currRoute.routes.forEach((e) => routes.push(e));
    else routes.push(currRoute);
  });
  return routes;
}

export const allRoutes = [...flattenRoutes(sidebarRoutes), ...hiddenRoutes];
