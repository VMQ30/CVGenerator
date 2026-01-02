import { Navbar } from "./components/Navbar";
import { WorkExperience } from "./components/WorkExperience";
import { PersonalDetails } from "./components/PersonalDetails";
import { useState } from "react";

export function App() {
  const [currentSection, setCurrentSection] = useState("Personal Details");

  const renderSection = () => {
    switch (currentSection) {
      case "Personal Details":
        return <PersonalDetails />;
      case "Work Experience":
        return <WorkExperience />;
    }
  };

  return (
    <div className="main-forms">
      <Navbar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      <div className="form-area">{renderSection()}</div>
    </div>
  );
}
