import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import { ToolsContextProvider } from "./context/ToolsContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./app/Test.jsx";

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <ToolsContextProvider>
      <Router>
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </ToolsContextProvider>
  </AppContextProvider>
);
