import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Navbar } from "./components/Navbar.jsx";
import { PersonalDetails } from "./components/PersonalDetails.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <PersonalDetails />
  </StrictMode>
);
