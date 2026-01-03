import { useState } from "react";
import { TextBox, TextArea, EditableBulletItem } from "./Input";

function Modal({ isOpen }) {
  const [bulletList, setBulletList] = useState([]);
  const [honorsList, setHonorsList] = useState([]);

  function handleSubmit() {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.entries(formData.entries());

    const bullets = bulletList.map((bullet) => data[bullet]);
    const honors = honorsList.map((honor) => data[honor]);
    const finalData = { ...data, bullets, honors };

    // onSave(finalData);
    setBulletList([]);
    setHonorsList([]);
  }

  function AddBulletList(newBullet) {
    setBulletList((prev) => [...prev, `educDetails-${newBullet}`]);
  }

  function AddHonorsList() {
    setHonorsList((prev) => [...prev, `honorList-${prev.length}`]);
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

export function Education() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="education">
      <h3>Education</h3>

      <button
        className="add-education"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Add Education
      </button>
      <Modal isOpen={isModalOpen} />
    </section>
  );
}
