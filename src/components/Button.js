export default function Button(props) {
	return (
		<button
			className={props.class}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.icon && <img src={props.icon} alt="" />}
			{props.value}
		</button>
	);
}
