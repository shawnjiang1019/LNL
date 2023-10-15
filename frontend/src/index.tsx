import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ScanPage from "./Components/ScanPage/ScanPage";
import PromptPage from "./Components/PromptPage/PromptPage";
import LNLDashboard from "./Components/LNL/LNLDashboard";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/face",
    element: <ScanPage />,
  },
  {
    path: "/prompt",
    element: <PromptPage />,
  },
  {
    path: "/lnl",
    element: <LNLDashboard />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
