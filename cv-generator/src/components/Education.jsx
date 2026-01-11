import dragIcon from "../assets/drag.svg";
import closeIcon from "../assets/close.svg";
import editIcon from "../assets/edit.svg";
import hideIcon from "../assets/hide.svg";
import unhideIcon from "../assets/unhide.svg";

import {
  DndContext,
  TouchSensor,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useState } from "react";
import { TextBox, EditableBulletItem } from "./Input";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Modal({ isOpen, onSave, onClose }) {
  const [bulletList, setBulletList] = useState([]);
  const [honorsList, setHonorsList] = useState([]);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event, list, setList) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setList((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setWasSubmitted(true);
    if (!e.currentTarget.checkValidity()) {
      const invalidInputs = e.currentTarget.querySelectorAll(":invalid");
      const errorMessages = [];

      invalidInputs.forEach((error) => {
        const fieldName = error.getAttribute("id") || "Field";
        errorMessages.push(
          `${fieldName
            .replace(/[0-9-]/g, "")
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ")} is missing or invalid`
        );
      });
      setErrors(errorMessages);

      return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const bullets = bulletList.map((bullet) => data[bullet]);
    const honors = honorsList.map((honor) => data[honor]);
    const finalData = { ...data, bullets, honors };

    onSave(finalData);
    setBulletList([]);
    setHonorsList([]);
    setErrors([]);
    setWasSubmitted(false);
  }

  function closeModal() {
    onClose();
    setWasSubmitted(false);
    setErrors([]);
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
        <form
          onSubmit={handleSubmit}
          className={wasSubmitted ? "submitted" : ""}
          noValidate
        >
          {errors.length > 0 ? (
            <div className="error-summary">
              {errors.map((msg, index) => (
                <p key={index} className="error">
                  <strong>⚠︎ {msg}</strong>
                </p>
              ))}
            </div>
          ) : null}

          <TextBox
            id="schoolName"
            label="* School/University Name"
            type="text"
            placeholder="e.g. University of the Philippines"
            required={true}
          />

          <LevelOfEducation />

          <div className="date">
            <TextBox
              id="startDateEduc"
              label="* Date Start"
              type="date"
              placeholder="MM/YYYY"
              required={true}
            />

            <TextBox
              id="endDateEduc"
              label="* Date Completed"
              type="date"
              placeholder="Present"
              required={true}
            />
          </div>

          <TextBox
            id="locationSchool"
            label="Location"
            type="text"
            placeholder="e.g. Sampaloc, Manila"
            required={false}
          />

          <TextBox
            id="gpa"
            label="GPA"
            type="text"
            placeholder="e.g. 1.25"
            required={false}
          />

          <div className="honors-list">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(e) => handleDragEnd(e, honorsList, setHonorsList)}
            >
              <SortableContext
                items={honorsList}
                strategy={verticalListSortingStrategy}
              >
                {honorsList.map((id) => (
                  <EditableBulletItem
                    key={id}
                    id={id}
                    label="Honors/Extracurriculars"
                    placeholder="e.g. Cum Laude, DOST Scholar"
                    onDelete={() => removeHonorsList(id)}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <button
              type="button"
              className="honors-button"
              onClick={AddHonorsList}
            >
              Add Honors and Extracurriculars
            </button>
          </div>

          <div className="educ-details">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(e) => handleDragEnd(e, bulletList, setBulletList)}
            >
              <SortableContext
                items={bulletList}
                strategy={verticalListSortingStrategy}
              >
                {bulletList.map((id) => (
                  <EditableBulletItem
                    key={id}
                    id={id}
                    label="Education Details"
                    placeholder="e.g. Capstone: E-Commerce App with SMS API"
                    onDelete={() => removeBulletList(id)}
                  />
                ))}
              </SortableContext>
            </DndContext>
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
            <button
              type="button"
              className="cancel"
              onClick={() => closeModal()}
            >
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
      <div>
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
      </div>

      {(levelOfEduc === "Tertiary Education" ||
        levelOfEduc === "Postgraduate Education") && (
        <TextBox
          id="degree"
          label="* Degree/Major"
          type="text"
          placeholder="Bachelor of Science in Information and Technology"
          required={true}
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

function EducationList({ data, onToggleHide, deleteData }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : "auto",
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`experience-list-wrapper ${isDragging ? "dragging" : ""}`}
    >
      <button className="drag" {...attributes} {...listeners}>
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
            isHidden={data.isHidden}
            onClick={onToggleHide}
          />

          <button className="delete" onClick={deleteData}>
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = currentList.findIndex((item) => item.id === active.id);
      const newIndex = currentList.findIndex((item) => item.id === over.id);

      const updatedList = arrayMove(currentList, oldIndex, newIndex);
      setEducationList(updatedList, "education");
    }
  }

  const handleSaveEducation = (newEducation) => {
    const updatedList = [
      ...currentList,
      {
        ...newEducation,
        id: `${currentList.length}-${Date.now()}`,
        isHidden: false,
      },
    ];

    setEducationList(updatedList, "education");
    setIsModalOpen(false);
  };

  function toggleHide(id) {
    const updatedItem = currentList.map((item) =>
      item.id === id ? { ...item, isHidden: !item.isHidden } : item
    );
    setEducationList(updatedItem, "education");
  }

  return (
    <section className="education">
      <h3>Education</h3>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={currentList.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {currentList.map((educ) => (
            <EducationList
              key={educ.id}
              data={educ}
              onToggleHide={() => toggleHide(educ.id)}
              deleteData={() =>
                setEducationList(
                  currentList.filter((ed) => ed.id !== educ.id),
                  "education"
                )
              }
            />
          ))}
        </SortableContext>
      </DndContext>
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
