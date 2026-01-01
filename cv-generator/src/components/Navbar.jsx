import { useState } from "react";
const navSections = [
  "Personal Details",
  "Work Experience",
  "Education",
  "Skills & Certifications",
  "Interests",
  "Additional",
  "Export",
];

function Button({ label, onClick, isActive }) {
  return (
    <button onClick={onClick} className={isActive ? "selected" : ""}>
      {label}
    </button>
  );
}

export function Navbar() {
  const [currentSection, setCurrentSection] = useState(navSections[0]);
  return (
    <nav>
      {navSections.map((section) => (
        <Button
          key={section}
          label={section}
          onClick={() => setCurrentSection(section)}
          isActive={currentSection === section}
        />
      ))}
    </nav>
  );
}
