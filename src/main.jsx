import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import { ToolsContextProvider } from "./context/ToolsContext.jsx";

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <ToolsContextProvider>
      <App />
    </ToolsContextProvider>
  </AppContextProvider>
);
