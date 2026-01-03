const navSections = [
  "Personal Details",
  "Work Experience",
  "Education",
  "Skills & Certifications",
  "Technical Projects",
  "Achievements or Awards",
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

export function Navbar({ currentSection, setCurrentSection }) {
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
