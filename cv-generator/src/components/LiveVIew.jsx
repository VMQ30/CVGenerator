import "../styles/LiveView.css";

function RenderPersonalDetails({ personalData }) {
  return (
    <div className="resume-personal-details">
      <h4 className="resume-name">{personalData.name}</h4>
      <div className="contact-details">
        {personalData.email ? (
          <>
            <p className="email">{personalData.email}</p>
            <p>|</p>
          </>
        ) : null}
        {personalData.contactNumber ? (
          <>
            <p className="contact-number">{personalData.contactNumber}</p>
            <p>|</p>
          </>
        ) : null}
        {personalData.location ? (
          <p className="location">{personalData.location}</p>
        ) : null}

        {personalData.portfolio ? (
          <>
            <p>|</p>
            <p className="portfolio">{personalData.portfolio}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}

function RenderWorkExperience({ workData }) {
  if (workData.length === 0) return null;

  return (
    <div className="resume-work-experience">
      <h4>WORK EXPERIENCE</h4>
      {workData.map((work) => (
        <div className="resume-list" key={work.id}>
          <div className="resume-header">
            <h5 className="company-name">{work.companyName}</h5>
            <h5 className="company-date">{`${work.startDate} - ${workData.endDate}`}</h5>
          </div>

          <div className="resume-details">
            <div className="resume-details-header">
              <p className="title">{work.jobTitle}</p>
              <p className="location">{work.jobLocation}</p>
            </div>
            <div className="resume-bullets">
              <ul>
                <li>{work.companyDesc}</li>
                {work.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RenderEducation({ educData }) {
  if (educData.length === 0) return null;

  return (
    <div className="resume-education">
      <h4>EDUCATION</h4>
      {educData.map((educ) => (
        <div className="resume-list" key={educ.id}>
          <div className="resume-header">
            <h5 className="company-name">{educ.schoolName}</h5>
            <h5 className="company-date">{`${educ.startDateEduc} - ${educ.endDateEduc}`}</h5>
          </div>

          <div className="resume-details">
            {educ.educLevel === "Tertiary Education" ||
            educ.educLevel === "Postgraduate Education" ? (
              <p className="course">{educ.degree}</p>
            ) : (
              <p className="educ-level">{educ.educLevel}</p>
            )}
          </div>

          <div className="resume-honors">
            <ul>
              {educ.honors.map((honor, index) => (
                <li key={index}>{honor}</li>
              ))}
            </ul>
          </div>

          <div className="resume-bullets">
            <ul>
              {educ.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

// function RenderSkills({ skillsData }) {
//   if (Object.keys(skillsData).length === 0) return;
//   return(
//     <div className=""
//   )
// }

export function LiveView({ resumeData }) {
  console.log(resumeData);
  return (
    <div className="live-view-wrapper">
      <div className="live-view-page">
        <RenderPersonalDetails personalData={resumeData.personalDetails} />
        <RenderWorkExperience workData={resumeData.workExperience} />
        <RenderEducation educData={resumeData.education} />
      </div>
    </div>
  );
}
