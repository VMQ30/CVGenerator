import dropDownOpenIcon from "../assets/up.svg";
import dropDownCloseIcon from "../assets/down.svg";
import dragIcon from "../assets/drag.svg";
import closeIcon from "../assets/close.svg";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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

function EditableBulletItem({
  id,
  label,
  placeholder,
  onDelete,
  value,
  onChange,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    position: "relative",
    opacity: isDragging ? 0.8 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} className="bullet-list-container">
      <button className="drag" {...attributes} {...listeners}>
        <img src={dragIcon} alt="drag" />
      </button>
      <div className="bullet-list">
        <div className="list-header">
          <label htmlFor={id}>{label}</label>
          <button className="close-button" onClick={onDelete}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <textarea
          id={id}
          name={id}
          rows="10"
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

function DropDownIcon({ isOpen }) {
  if (!isOpen) {
    return <img src={dropDownCloseIcon} alt="open drop down list" />;
  }
  return <img src={dropDownOpenIcon} alt="close drop down list" />;
}

function CategoryButton({
  label,
  items,
  addItems,
  deleteItems,
  onItemChange,
  onReorder,
}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleClickDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div className="category-button">
      <div className="category-button-header" onClick={handleClickDropDown}>
        <h3>{label}</h3>
        <DropDownIcon isOpen={isDropDownOpen} />
      </div>
      <DropDown
        isOpen={isDropDownOpen}
        label={label}
        items={items}
        addItems={addItems}
        deleteItems={deleteItems}
        onItemChange={onItemChange}
        onReorder={onReorder}
      />
    </div>
  );
}

function DropDown({
  isOpen,
  label,
  items,
  addItems,
  deleteItems,
  onItemChange,
  onReorder,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      // delay: 250ms allows users to scroll the drop-down without accidentally dragging.
      // A long press (250ms) will activate the drag.
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  if (!isOpen) return null;

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="drop-down-container">
      <div className="drop-down-list">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <EditableBulletItem
                key={item.id}
                id={item.id}
                label={label}
                placeholder={`Write Your ${label}`}
                onDelete={() => deleteItems(item.id)}
                value={item.text}
                onChange={(e) => onItemChange(item.id, e.target.value)}
              />
            ))}
          </SortableContext>
        </DndContext>

        <button
          className="add-skills-details"
          onClick={addItems}
        >{`Add ${label}`}</button>
      </div>
    </div>
  );
}

export function SkillsAndCertifications({ skillsData, setSkillsData }) {
  const categories = ["Skills", "Technology", "Languages", "Certificates"];
  const currentData = {
    Skills: skillsData?.Skills || [],
    Technology: skillsData?.Technology || [],
    Languages: skillsData?.Languages || [],
    Certificates: skillsData?.Certificates || [],
  };

  const handleReorder = (category, newItems) => {
    const updatedData = {
      ...currentData,
      [category]: newItems,
    };
    setSkillsData(updatedData, "skillsAndCertifications");
  };

  const addCategoryItem = (category) => {
    const newItem = { id: `${category}-${Date.now()}`, text: "" };
    const updatedData = {
      ...currentData,
      [category]: [...currentData[category], newItem],
    };
    setSkillsData(updatedData, "skillsAndCertifications");
  };

  const removeCategoryItem = (delId, category) => {
    const updatedData = {
      ...currentData,
      [category]: currentData[category].filter((item) => item.id !== delId),
    };
    setSkillsData(updatedData, "skillsAndCertifications");
  };

  const handleItemChange = (category, itemId, newText) => {
    const updatedData = {
      ...currentData,
      [category]: currentData[category].map((item) =>
        item.id === itemId ? { ...item, text: newText } : item
      ),
    };
    setSkillsData(updatedData, "skillsAndCertifications");
  };

  return (
    <section className="skills">
      {categories.map((category) => (
        <CategoryButton
          key={category}
          label={category}
          items={currentData[category]}
          addItems={() => addCategoryItem(category)}
          deleteItems={(id) => removeCategoryItem(id, category)}
          onItemChange={(id, text) => handleItemChange(category, id, text)}
          onReorder={(newItems) => handleReorder(category, newItems)}
        />
      ))}
    </section>
  );
}
