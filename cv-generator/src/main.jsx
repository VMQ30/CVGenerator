import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PersonalDetails } from "./components/PersonalDetails.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PersonalDetails />
  </StrictMode>
);
