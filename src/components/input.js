export default function input(props) {
	return (
		<div>
			<label htmlFor={props.name}>{props.label}</label>
			<input
				type={props.type}
				value={props.value}
				name={props.name}
				onChange={props.handleInput}
				placeholder={props.placeholder}
				required
			/>
		</div>
	);
}
