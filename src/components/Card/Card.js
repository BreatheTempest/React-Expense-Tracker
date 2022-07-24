import React from 'react';
import './Card.css';

export default function Spending(props) {
	return (
		<div className="spending-card">
			<div className="img">
				<props.icon />
			</div>
			<div>
				<p>{props.rate}</p>
				<h3>{props.value}</h3>
			</div>
		</div>
	);
}
