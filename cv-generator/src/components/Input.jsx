import dragIcon from "../assets/drag.svg";
import closeIcon from "../assets/close.svg";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function TextBox({ id, type, placeholder, label, required }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export function TextArea({ id, label, placeholder, required }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={id}
        rows="10"
        placeholder={placeholder}
        required={required}
        aria-required={required}
      />
    </>
  );
}

export function EditableBulletItem({ id, label, placeholder, onDelete }) {
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
      <button type="button" className="drag" {...attributes} {...listeners}>
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
          required={true}
        />
      </div>
    </div>
  );
}
