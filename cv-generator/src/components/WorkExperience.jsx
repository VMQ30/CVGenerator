import { useState } from "react";
import { TextBox } from "./Textbox";

function Modal({ isOpen }) {
  if (!isOpen) return null;
  return (
    <div className="modal-container">
      <div className="modal">
        <form>
          <TextBox
            id="companyName"
            label="* Company Name"
            type="text"
            placeholder="e.g. Google, Stripe, or Freelance"
          />

          <TextBox
            id="jobTitle"
            label="* Job Title"
            type="text"
            placeholder="e.g. Senior Product Designer"
          />

          <div className="date">
            <TextBox
              id="startDate"
              label="* Date Start"
              type="date"
              placeholder="MM/YYYY"
            />

            <TextBox
              id="endDate"
              label="* Date End"
              type="date"
              placeholder="Present"
            />

            <input
              id="workPresent"
              name="workPresent"
              type="checkbox"
              placeholder="yes"
            />
            <label htmlFor="workPresent">Currently Working Here</label>
          </div>

          <TextBox
            id="jobLocation"
            label="* Job Location"
            type="text"
            placeholder="e.g. New York, NY or Remote"
          />

          <TextBox
            id="jobLocation"
            label="* Company Description"
            type="text"
            placeholder="City"
          />

          <label htmlFor="companyDescription">* Company Description</label>
          <textarea
            id="companyDesc"
            name="companyDesc"
            rows="10"
            placeholder="e.g. A Fortune 500 fintech leader with over $200M in annual revenue, specializing in global payment processing."
          />
        </form>
      </div>
    </div>
  );
}
export function WorkExperience() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section>
      <h3>Work Experience</h3>
      <button onClick={() => setIsModalOpen(!isModalOpen)}>
        Add Work Experiece
      </button>

      <Modal isOpen={isModalOpen} />
    </section>
  );
}
