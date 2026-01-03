import "../styles/PersonalDetails.css";

function TextBox({ id, type, placeholder, label, value, onChange }) {
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
          placeholder="John Doe"
          label="* Full Name: "
          value={currentList.name}
          onChange={handleChange}
        />

        <TextBox
          id="email"
          type="email"
          placeholder="sample@email.com"
          label="* Email: "
          value={currentList.email}
          onChange={handleChange}
        />

        <TextBox
          id="contactNumber"
          type="tel"
          placeholder="(000) 000-0000"
          label="* Contact Number: "
          value={currentList.contactNumber}
          onChange={handleChange}
        />

        <TextBox
          id="location"
          type="text"
          placeholder="Place"
          label="* Location (City): "
          value={currentList.location}
          onChange={handleChange}
        />

        <TextBox
          id="portfolio"
          type="text"
          placeholder="https://github.com/samplename"
          label="* Portfolio/Github Link: "
          value={currentList.portfolio}
          onChange={handleChange}
        />
      </form>
    </section>
  );
}
