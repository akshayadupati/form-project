import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Form from "./components/Form";
import ViewForm from "./components/ViewForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListForm from "./components/ListForm";

const routerConfiguration = createBrowserRouter([
  {
    element: <ListForm />,
    path: "/",
  },
  {
    element: <Form />,
    path: "/createForm",
  },
  {
    element: <ViewForm />,
    path: "/viewForm/:id",
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routerConfiguration} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
