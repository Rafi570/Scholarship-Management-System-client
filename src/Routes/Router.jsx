import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Forgot from "../Pages/Auth/Forgot";
import DetailsUniverScholarship from "../Components/DetailsUniverScholarship/DetailsUniverScholarship";
import Loading from "../Components/Loading/Loading";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import MyReview from "../Pages/Dashboard/MyReview";
import AllScholarShip from "../Pages/AllScholarShip/AllScholarShip";
import Profile from "../Pages/Profile/Profile";
import AddScholarShip from "../Pages/Dashboard/AddScholarShip/AddScholarShip";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageScholarShip from "../Pages/Dashboard/ManageScholarShip/ManageScholarShip";

export const router = createBrowserRouter([
  // RootRelated
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/scholarship/:id",
        element: (
          <PrivateRoute>
            <DetailsUniverScholarship></DetailsUniverScholarship>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/scholarships/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path:'/scholarships',
        Component: AllScholarShip
      }
    ],
  },
  // auth related
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/auth/forgot-pass",
        Component: Forgot,
      },
    ],
  },

  // dashboard
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children:[
      {
        index: true,
        Component: DashboardHome
      },
      {
        path:'my-review',
        Component:MyReview
      },
      {
        path:'profile',
        Component:Profile
      },
      {
        path: "add-scholarship",
        Component:AddScholarShip
      },
      {
        path:'manage-users',
        Component:ManageUsers
      },
            {
        path:'manage-scholarship',
        Component:ManageScholarShip
      }

    ]
  },
]);
