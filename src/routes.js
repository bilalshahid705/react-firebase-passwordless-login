import React from "react";
const Dashboard = React.lazy(() => import("./pages/dashboard-page/dashboard"));
const Passwordless = React.lazy(() =>
  import("./pages/passwordless-page/passwordless")
);
const LoginPage = React.lazy(() => import("./pages/login-page/login-page"));

export const publicRoutes = [
  {
    path: "/login",
    name: "Login",
    exact: true,
    component: <LoginPage />,
  },
  {
    path: "/",
    name: "passwordless link",
    component: <Passwordless />,
  },
];

export const privateRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    exact: true,
    component: <Dashboard />,
  },
];
