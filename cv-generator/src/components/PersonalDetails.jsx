function TextBox({ id, type, placeholder, label, value, onChange, required }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(id, e.target.value)}
        required={required}
      />
    </div>
  );
}

export function PersonalDetails({ personalList, setPersonalList }) {
  const currentList = personalList || [];
  const handleChange = (field, value) => {
    const updatedList = {
      ...currentList,
      [field]: value,
    };
    setPersonalList(updatedList, "personalDetails");
  };
  return (
    <section className="personal-details-wrapper">
      <h3>Personal Details</h3>
      <form className="personal-details-form">
        <TextBox
          id="name"
          type="text"
          placeholder="e.g. Juan D. Dela Cruz"
          label="* Full Name: "
          value={currentList.name}
          onChange={handleChange}
          required={true}
        />

        <TextBox
          id="email"
          type="email"
          placeholder="e.g. sample@email.com"
          label="* Email: "
          value={currentList.email}
          onChange={handleChange}
          required={true}
        />

        <TextBox
          id="contactNumber"
          type="tel"
          placeholder="e.g. 0917 123 4567"
          label="* Contact Number: "
          value={currentList.contactNumber}
          onChange={handleChange}
        />

        <TextBox
          id="location"
          type="text"
          placeholder="e.g. Quezon City, Metro Manila"
          label="* Location (City): "
          value={currentList.location}
          onChange={handleChange}
          required={true}
        />

        <TextBox
          id="portfolio"
          type="url"
          placeholder="e.g. https://github.com/samplename"
          label="Portfolio/Github Link: "
          value={currentList.portfolio}
          onChange={handleChange}
          required={false}
        />
      </form>
    </section>
  );
}
