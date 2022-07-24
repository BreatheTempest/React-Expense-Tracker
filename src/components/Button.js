export default function Button(props) {
	return (
		<button
			className={props.class}
			onClick={props.onClick}
			disabled={props.disabled}
			name={props.name}
		>
			{props.icon && (
				<img
					className={props.iconClass}
					name={props.name}
					src={props.icon}
					alt=""
				/>
			)}
			{props.value}
		</button>
	);
}
