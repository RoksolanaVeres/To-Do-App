import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemeContextProvider from "./contexts/ThemeContext.jsx";
import TasksContextProvider from "./contexts/TasksContext.jsx";
import "@fontsource-variable/nunito-sans/wght-italic.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
