
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./Context/LoginContext.jsx";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { TasksProvider } from "./Context/TasksContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
);
