import "../styles/Navbar.css";

const navSections = [
  "Personal Details",
  "Work Experience",
  "Education",
  "Skills & Certifications",
  "Technical Projects",
  "Achievements & Awards",
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
      <div className="nav-wrapper">
        {navSections.map((section) => (
          <Button
            key={section}
            label={section}
            onClick={() => setCurrentSection(section)}
            isActive={currentSection === section}
          />
        ))}
      </div>
    </nav>
  );
}
