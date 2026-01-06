function RenderPersonalDetails({ personalData }) {
  console.log(personalData);

  return (
    <div className="resume-personal-details">
      <h4 className="resume-name">{personalData.name}</h4>
      <div className="contact-details">
        <p className="email">{personalData.email + "|"}</p>
        <p className="contact-number">{personalData.contactNumber + "|"}</p>
        <p className="location">{personalData.location}</p>

        {personalData.portfolio ? (
          <p className="portfolio">{" | " + personalData.portfolio}</p>
        ) : null}
      </div>
    </div>
  );
}

export function LiveView({ resumeData }) {
  console.log(resumeData);
  return (
    <div className="live-view-wrapper">
      <div className="live-view-page">
        <RenderPersonalDetails personalData={resumeData.personalDetails} />
      </div>
    </div>
  );
}
