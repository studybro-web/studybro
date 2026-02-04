import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
  <AdminProvider>
    <App />
  </AdminProvider>
</AuthProvider>

);
