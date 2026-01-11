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

export function Modal({ isOpen, onSave, onClose }) {
  if (!isOpen) return null;
  const [bulletList, setBulletList] = useState([]);
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
    const finalData = { ...data, bullets };

    onSave(finalData);
    setBulletList([]);
    setErrors([]);
    setWasSubmitted(false);
  }

  function closeModal() {
    onClose();
    setWasSubmitted(false);
    setErrors([]);
  }

  function AddBulletList() {
    setBulletList((prev) => [...prev, `project-${Date.now()}`]);
  }

  function RemoveBulletList(delId) {
    setBulletList((prev) => prev.filter((id) => id !== delId));
  }

  return (
    <div className="modal-container">
      <div className="modal">
        <form
          className={wasSubmitted ? "submitted" : ""}
          onSubmit={handleSubmit}
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
            id="projectName"
            label="* Project Name"
            type="text"
            placeholder="e.g. Healthcare Analytics Dashboard"
            required={true}
          />

          <TextBox
            id="projectRole"
            label="* Project Role"
            type="text"
            placeholder="e.g. Frontend Developer"
            required={true}
          />

          <TextBox
            id="projectLink"
            label="Project Link"
            type="url"
            placeholder="https:github.com/projectname"
            required={false}
          />

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(e) => handleDragEnd(e, bulletList, setBulletList)}
          >
            <SortableContext
              items={bulletList}
              strategy={verticalListSortingStrategy}
            >
              {bulletList.map((bullet) => (
                <EditableBulletItem
                  id={bullet}
                  key={bullet}
                  label="Project Details"
                  placeholder="e.g. Implemented real-time data visualization using D3.js"
                  onDelete={() => RemoveBulletList(bullet)}
                />
              ))}
            </SortableContext>
          </DndContext>

          <button type="button" className="add-bullet" onClick={AddBulletList}>
            Add Bullet Point
          </button>
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
            Remove Project
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

function ProjectList({ data, onToggleHide, deleteData }) {
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
      <div className="project-list">
        <div className="project-details">
          <p className="list-name">{data.projectName}</p>
          <p>-</p>
          <p className="list-name">{data.projectRole}</p>
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

          <button className="delete">
            <img src={closeIcon} alr="delete" onClick={deleteData} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function TechnicalProjects({ projectsList, setProjectsList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentList = projectsList || [];

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
      setProjectsList(updatedList, "technicalProjects");
    }
  }

  const handleSaveProject = (newProject) => {
    const updatedList = [
      ...currentList,
      {
        ...newProject,
        id: `${currentList.length}-${Date.now()}`,
        isHidden: false,
      },
    ];
    setProjectsList(updatedList, "technicalProjects");
    setIsModalOpen(false);
    console.log(updatedList);
  };

  function toggleHide(id) {
    const updatedList = currentList.map((item) =>
      id === item.id ? { ...item, isHidden: !item.isHidden } : item
    );
    setProjectsList(updatedList, "technicalProjects");
  }

  return (
    <section className="projects">
      <h3>Technical Projects</h3>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={currentList.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {currentList.map((project) => (
            <ProjectList
              key={project.id}
              data={project}
              onToggleHide={() => toggleHide(project.id)}
              deleteData={() =>
                setProjectsList(
                  currentList.filter((proj) => proj.id !== project.id),
                  "technicalProjects"
                )
              }
            />
          ))}
        </SortableContext>
      </DndContext>
      <button className="add-projects" onClick={() => setIsModalOpen(true)}>
        Add Project
      </button>

      <Modal
        isOpen={isModalOpen}
        onSave={handleSaveProject}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
