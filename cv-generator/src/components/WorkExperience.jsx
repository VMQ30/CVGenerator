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
import { TextBox, TextArea, EditableBulletItem } from "./Input";

function Modal({ isOpen, onSave, onClose }) {
  const [bulletList, setbulletList] = useState([]);

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
            placeholder="e.g. Accenture, GCash, or Maya"
          />

          <TextBox
            id="jobTitle"
            label="* Job Title"
            type="text"
            placeholder="e.g. Associate Software Engineer"
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
            placeholder="e.g. BGC, Taguig"
          />

          <TextArea
            id="companyDesc"
            label="* Company Description"
            placeholder="e.g. A leading digital bank in the Philippines serving over 1M users."
          />

          <div className="modal-responsibility">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(e) => handleDragEnd(e, bulletList, setbulletList)}
            >
              <SortableContext
                items={bulletList}
                strategy={verticalListSortingStrategy}
              >
                {bulletList.map((bullet) => (
                  <EditableBulletItem
                    key={bullet}
                    id={bullet}
                    label="Responsibility/Achievement"
                    placeholder="e.g. Developed RESTful APIs using Node.js for a local logistics app."
                    onDelete={() => deleteBullet(bullet)}
                  />
                ))}
              </SortableContext>
            </DndContext>
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
          <p className="list-name">{data.companyName}</p>
          <p>-</p>
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

export function WorkExperience({ workList, setWorkList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentList = workList || [];

  const handleSaveExperience = (newExperience) => {
    const updatedList = [
      ...currentList,
      { ...newExperience, id: `${currentList.length}-${Date.now()}` },
    ];

    setWorkList(updatedList, "workExperience");
    setIsModalOpen(false);
  };

  return (
    <section>
      <h3>Work Experience</h3>

      {currentList.map((experience) => (
        <ExperienceList key={experience.id} data={experience} />
      ))}

      <button onClick={() => setIsModalOpen(!isModalOpen)}>
        Add Work Experience
      </button>
      <Modal
        isOpen={isModalOpen}
        onSave={handleSaveExperience}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
