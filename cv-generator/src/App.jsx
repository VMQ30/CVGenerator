import { Navbar } from "./components/Navbar";
import { WorkExperience } from "./components/WorkExperience";
import { PersonalDetails } from "./components/PersonalDetails";
import { Education } from "./components/Education";
import { SkillsAndCertifications } from "./components/SkillsAndCertifications";
import { useState } from "react";

export function App() {
  const [resumeData, setResumeData] = useState({
    personalDetails: {},
    workExperience: [],
    education: [],
    skillsAndCertifications: [],
  });

  const updateResumeData = (data, category) => {
    setResumeData((prev) => ({
      ...prev,
      [category]: data,
    }));
  };

  const [currentSection, setCurrentSection] = useState("Personal Details");

  const renderSection = () => {
    switch (currentSection) {
      case "Personal Details":
        return (
          <PersonalDetails
            personalList={resumeData.personalDetails}
            setPersonalList={updateResumeData}
          />
        );
      case "Work Experience":
        return (
          <WorkExperience
            workList={resumeData.workExperience}
            setWorkList={updateResumeData}
          />
        );
      case "Education":
        return (
          <Education
            educationList={resumeData.education}
            setEducationList={updateResumeData}
          />
        );
      case "Skills & Certifications":
        return <SkillsAndCertifications />;
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
