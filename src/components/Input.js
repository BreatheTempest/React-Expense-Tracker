export default function Input(props) {
	return (
		<div className={`input-element ${props.class ? props.class : ''}`}>
			{props.label && (
				<div className="label">
					<label htmlFor={props.name}>{props.label}</label>
					<p>{props.error}</p>
				</div>
			)}
			<input
				type={props.type}
				value={props.value}
				name={props.name}
				onChange={props.handleInput}
				placeholder={props.placeholder}
				autoComplete={props.autoComplete}
				required={props.required}
				id={props.name}
				readOnly={props.readOnly}
				checked={props.checked}
			/>
		</div>
	);
}
