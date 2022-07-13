export default function Button(props) {
	return (
		<button className={props.class} onClick={props.onClick}>
			<img src={props.icon} alt="" />
			{props.value}
		</button>
	);
}
