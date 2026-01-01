import "../styles/PersonalDetails.css";

function TextBox({ id, type, placeholder, label }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} name={id} id={id} placeholder={placeholder} />
    </div>
  );
}

export function PersonalDetails() {
  return (
    <section className="personal-details-wrapper">
      <h3>Personal Details</h3>
      <form className="personal-details-form">
        <TextBox
          id="name"
          type="text"
          placeholder="John Doe"
          label="* Full Name: "
        />

        <TextBox
          id="email"
          type="email"
          placeholder="sample@email.com"
          label="* Email: "
        />

        <TextBox
          id="contactNumber"
          type="tel"
          placeholder="(000) 000-0000"
          label="* Contact Number: "
        />

        <TextBox
          id="location"
          type="text"
          placeholder="Place"
          label="* Location (City): "
        />

        <TextBox
          id="portfolio"
          type="text"
          placeholder="https://github.com/samplename"
          label="* Portfolio/Github Link: "
        />
      </form>

      <button className="next-button">Next</button>
    </section>
  );
}
