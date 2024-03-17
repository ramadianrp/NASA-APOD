import React from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter, redirect } from "react-router-dom";
import './App.css'
import AssetList from '../pages/AssetList'
import MainLayout from '../components/MainLayout'
import EditPage from '../pages/EditPage'
import AddUser from '../pages/AddUser'
import AddAsset from '../pages/AddAsset'
import LoginPage from '../pages/LoginPage' 


const router = createBrowserRouter([
  {
    element: <MainLayout />,
    loader: () => {
      if (!localStorage.token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <AssetList />,
      },,
      {
        path: "/asset/:id",
        element: <EditPage />,
      },
      {
        path: "/asset",
        element: <AddAsset />,
      },
      {
        path: "/add-user",
        element: <AddUser />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
]);


function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
