import React from 'react';
import './Expense.css';
import Button from '../Button';

export default function Expense(props) {
	return (
		<div className={props.class}>
			<div className="name">
				{props.img && <img src={props.img} alt="" />}
				<p>{props.title}</p>
			</div>
			<p className="type">{props.type}</p>
			<p className="amount">{props.amount}</p>
			<p className="date">{props.date}</p>
			<p className="invoice">{props.invoice}</p>
			{props.edit && <Button value="Edit" onClick={props.edit} />}
		</div>
	);
}
