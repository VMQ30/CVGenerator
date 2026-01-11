import { Navbar } from "./components/Navbar";
import { WorkExperience } from "./components/WorkExperience";
import { PersonalDetails } from "./components/PersonalDetails";
import { Education } from "./components/Education";
import { SkillsAndCertifications } from "./components/SkillsAndCertifications";
import { TechnicalProjects } from "./components/TechnicalProjects";
import { AchievementsAndAwards } from "./components/AchievementsAndAwards";
import { LiveView } from "./components/LiveVIew";
import { useState } from "react";

import "./styles/App.css";
import "./styles/FormSections.css";

export function App() {
  const [resumeData, setResumeData] = useState({
    personalDetails: {},
    workExperience: [],
    education: [],
    skillsAndCertifications: {},
    technicalProjects: [],
    achievementsAndAwards: {},
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
        return (
          <SkillsAndCertifications
            skillsData={resumeData.skillsAndCertifications}
            setSkillsData={updateResumeData}
          />
        );
      case "Technical Projects":
        return (
          <TechnicalProjects
            projectsList={resumeData.technicalProjects}
            setProjectsList={updateResumeData}
          />
        );
      case "Achievements & Awards":
        return (
          <AchievementsAndAwards
            achievementsList={resumeData.achievementsAndAwards}
            setAchievementsList={updateResumeData}
          />
        );
    }
  };

  return (
    <div className="resume-container">
      <Navbar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      <main className="main-area">
        {renderSection()}
        <LiveView resumeData={resumeData} />
      </main>
    </div>
  );
}
