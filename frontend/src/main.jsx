import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MoneyProvider } from "./context/MoneyContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MoneyProvider>
      <App />
    </MoneyProvider>
  </StrictMode>
);
