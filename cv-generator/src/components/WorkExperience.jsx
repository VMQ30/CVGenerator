import dragIcon from "../assets/drag.svg";
import closeIcon from "../assets/close.svg";
import editIcon from "../assets/edit.svg";
import hideIcon from "../assets/hide.svg";
import unhideIcon from "../assets/unhide.svg";

import { useState } from "react";
import { TextBox, TextArea, EditableBulletItem } from "./Input";

function Modal({ isOpen, onSave, onClose }) {
  const [bulletList, setbulletList] = useState([]);

  function addBullet() {
    setbulletList((prevNum) => [...prevNum, `responsibility${Date.now()}`]);
  }

  function deleteBullet(delId) {
    setbulletList((prev) => prev.filter((id) => id !== delId));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const bullets = bulletList.map((id) => data[id]);
    const finalData = { ...data, bullets };

    onSave(finalData);
    setbulletList([]);
  }

  if (!isOpen) return null;
  return (
    <div className="modal-container">
      <div className="modal">
        <form onSubmit={handleSubmit}>
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
          </div>

          <TextBox
            id="jobLocation"
            label="* Job Location"
            type="text"
            placeholder="e.g. New York, NY or Remote"
          />

          <TextArea
            id="companyDesc"
            label="* Company Description"
            placeholder="e.g. A Fortune 500 fintech leader with over $200M in annual revenue, specializing in global payment processing."
          />

          <div className="modal-responsibility">
            {bulletList.map((bullet) => (
              <EditableBulletItem
                key={bullet}
                id={bullet}
                label="Responsibility/Achievement"
                placeholder="e.g. Led a cross-functional team to improve checkout performance by 25%"
                onDelete={() => deleteBullet(bullet)}
              />
            ))}
            <button type="button" className="add-bullet" onClick={addBullet}>
              Add Bullet Point
            </button>
          </div>

          <div className="form-buttons">
            <button className="save">Save</button>
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
          <button type="button" className="remove-experience">
            Remove Experience
          </button>
        </form>
      </div>
    </div>
  );
}

function ToggleHideButton({ isHidden, onClick }) {
  if (isHidden) {
    return (
      <button className="hide">
        <img src={hideIcon} alt="hide" onClick={onClick} />
      </button>
    );
  }

  if (!isHidden) {
    return (
      <button className="unhide">
        <img src={unhideIcon} alt="hide" onClick={onClick} />
      </button>
    );
  }
}

function ExperienceList({ data }) {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className="experience-list-wrapper">
      <button className="drag">
        <img src={dragIcon} alt="drag" />
      </button>
      <div className="experience-list">
        <div className="experience-details">
          <p className="list-name">{data.companyName} - </p>
          <p className="list-title">{data.jobTitle}</p>
        </div>

        <div className="experience-buttons">
          <button className="edit">
            <img src={editIcon} alt="edit" />
          </button>

          <ToggleHideButton
            key="hide"
            isHidden={isHidden}
            onClick={() => setIsHidden(!isHidden)}
          />

          <button className="delete">
            <img src={closeIcon} alr="delete" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function WorkExperience() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experiences, setExperiences] = useState([]);

  const handleSaveExperience = (newExperience) => {
    setExperiences((prev) => [
      ...prev,
      { ...newExperience, id: `experience-${prev.length}` },
    ]);
    setIsModalOpen(false);
  };

  return (
    <section>
      <h3>Work Experience</h3>
      <button onClick={() => setIsModalOpen(!isModalOpen)}>
        Add Work Experience
      </button>

      {experiences.map((experience) => (
        <ExperienceList key={experience.id} data={experience} />
      ))}

      <Modal
        isOpen={isModalOpen}
        onSave={handleSaveExperience}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
