import React from 'react';
import './Spending.css';

export default function Spending(props) {
	return (
		<div className="spending-card">
			<img src={props.icon} alt="" />
			<div>
				<p>{props.rate}</p>
				<h3>{props.value}</h3>
			</div>
		</div>
	);
}
