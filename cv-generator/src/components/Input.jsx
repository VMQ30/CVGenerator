import dragIcon from "../assets/drag.svg";
import closeIcon from "../assets/close.svg";

export function TextBox({ id, type, placeholder, label }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} name={id} id={id} placeholder={placeholder} />
    </div>
  );
}

export function TextArea({ id, label, placeholder }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={id} rows="10" placeholder={placeholder} />
    </>
  );
}

export function EditableBulletItem({ id, label, placeholder, onDelete }) {
  return (
    <div className="bullet-list-container">
      <button className="drag">
        <img src={dragIcon} alt="drag" />
      </button>
      <div className="bullet-list">
        <div className="list-header">
          <label htmlFor={id}>{label}</label>
          <button className="close-button" onClick={onDelete}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <textarea id={id} name={id} rows="10" placeholder={placeholder} />
      </div>
    </div>
  );
}
