import dragIcon from "../assets/drag.svg";
import closeIcon from "../assets/close.svg";
import editIcon from "../assets/edit.svg";
import hideIcon from "../assets/hide.svg";
import unhideIcon from "../assets/unhide.svg";
import { useState } from "react";
import { TextBox, EditableBulletItem } from "./Input";

function Modal({ isOpen, onSave, onClose }) {
  const [bulletList, setBulletList] = useState([]);
  const [honorsList, setHonorsList] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const bullets = bulletList.map((bullet) => data[bullet]);
    const honors = honorsList.map((honor) => data[honor]);
    const finalData = { ...data, bullets, honors };

    onSave(finalData);
    setBulletList([]);
    setHonorsList([]);
  }

  function AddBulletList() {
    setBulletList((prev) => [...prev, `educDetails-${Date.now()}`]);
  }

  function AddHonorsList() {
    setHonorsList((prev) => [...prev, `honorList-${Date.now()}`]);
  }

  function removeHonorsList(delId) {
    setHonorsList((prev) => prev.filter((id) => id !== delId));
  }

  function removeBulletList(delId) {
    setBulletList((prev) => prev.filter((id) => id !== delId));
  }

  if (!isOpen) return null;
  return (
    <div className="modal-container">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <TextBox
            id="schoolName"
            label="* School/University Name"
            type="text"
            placeholder="University of..."
          />

          <LevelOfEducation />

          <div className="date">
            <TextBox
              id="startDateEduc"
              label="* Date Start"
              type="date"
              placeholder="MM/YYYY"
            />

            <TextBox
              id="endDateEduc"
              label="* Date Completed"
              type="date"
              placeholder="Present"
            />
          </div>

          <TextBox
            id="location-school"
            label="Location"
            type="text"
            placeholder="Makati"
          />

          <TextBox id="gpa" label="GPA" type="text" placeholder="3.5" />

          <div className="honors-list">
            {honorsList.map((honors) => (
              <EditableBulletItem
                key={honors}
                id={honors}
                label="Honors/Extracurriculars"
                placeholder="Dean's List, Summa Cum Laude, Organization President"
                onDelete={() => removeHonorsList(honors)}
              />
            ))}

            <button
              type="button"
              className="honors-button"
              onClick={AddHonorsList}
            >
              Add Honors and Extracurricular
            </button>
          </div>

          <div className="educ-details">
            {bulletList.map((bullet) => (
              <EditableBulletItem
                id={bullet}
                key={bullet}
                label="Education Details"
                placeholder="details"
                onDelete={() => removeBulletList(bullet)}
              />
            ))}
            <button
              type="button"
              className="add-bullet"
              onClick={AddBulletList}
            >
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
            Remove Education
          </button>
        </form>
      </div>
    </div>
  );
}

function LevelOfEducation() {
  const levelList = [
    "Primary Education",
    "Secondary Education",
    "Tertiary Education",
    "Postgraduate Education",
  ];

  const [levelOfEduc, setLevelOfEduc] = useState(levelList[0]);

  const handleSelectChange = (e) => {
    setLevelOfEduc(e.target.value);
  };
  return (
    <>
      <label htmlFor="educLevel">* Education Level</label>
      <select
        name="educLevel"
        id="educLevel"
        value={levelOfEduc}
        onChange={handleSelectChange}
      >
        {levelList.map((level) => (
          <option key={level} id={level}>
            {level}
          </option>
        ))}
      </select>

      {(levelOfEduc === "Tertiary Education" ||
        levelOfEduc === "Postgraduate Education") && (
        <TextBox
          id="degree"
          label="* Degree/Major"
          type="text"
          placeholder="Bachelor of Science in Information and Technology"
        />
      )}
    </>
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

function EducationList({ data }) {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className="education-list-wrapper">
      <button className="drag">
        <img src={dragIcon} alt="drag" />
      </button>
      <div className="education-list">
        <div className="education-details">
          <p className="list-name">{data.schoolName}</p>
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

export function Education({ educationList, setEducationList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentList = educationList || [];

  const handleSaveEducation = (newEducation) => {
    const updatedList = [
      ...currentList,
      { ...newEducation, id: `${currentList.length}-${Date.now()}` },
    ];
    setEducationList(updatedList, "education");
    setIsModalOpen(false);
  };

  return (
    <section className="education">
      <h3>Education</h3>

      {currentList.map((educ) => (
        <EducationList key={educ.id} data={educ} />
      ))}
      <button
        className="add-education"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Add Education
      </button>

      <Modal
        isOpen={isModalOpen}
        onSave={handleSaveEducation}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
