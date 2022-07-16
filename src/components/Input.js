export default function Input(props) {
  return (
    <div className={`input-element ${props.className}`}>
      <div className="label">
        <label htmlFor={props.name}>{props.label}</label>
        <p>{props.error}</p>
      </div>
      <input
        type={props.type}
        value={props.value}
        name={props.name}
        onChange={props.handleInput}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        required
      />
    </div>
  );
}
