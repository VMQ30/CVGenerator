export function TextBox({ id, type, placeholder, label }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} name={id} id={id} placeholder={placeholder} />
    </div>
  );
}
