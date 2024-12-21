import { lazy } from "react";
import { Loadable } from "../components";
import AuthGuard from "../sessions/login/AuthGuard";
import Layout from "../layouts/Layout";
// Lazy loading components
const FirebaseRegister =Loadable(lazy(()=>import("../sessions/register/FirebaseRegister")))
const FirebaseLogin = Loadable(lazy(() => import("../sessions/login/Login")));
const Redirect = Loadable(lazy(() => import("../sessions/login/Redirect")));
const Dashboards=Loadable(lazy(() => import("../pages/dashboard/Dashboards")));
const CustomerList = Loadable(lazy(() => import("../pages/customerList/CustomerList")));
const UsersList=Loadable(lazy(() => import("../pages/userList/UsersList")));
const routes = [
  {
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/dashboard/default", // Home page route
        element: <Dashboards />,
      },
      {
        path: "/customerList",
        element: <CustomerList />,
      },
      {
        path: "/usersList",
        element: <UsersList />,
      }
    ],
  },
  {
    path: "/session/signin",
    element: <FirebaseLogin />, // Login page
  },
  {
    path:"/session/signup",
    element:<FirebaseRegister />
  },
  {
    path: "*", // Catch-all route for undefined paths
    element: <Redirect />, // Redirect or a 404 component
  },
];

export default routes;
