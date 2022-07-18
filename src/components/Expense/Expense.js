import React from 'react';
import './Expense.css';
import Button from '../Button';

export default function Expense(props) {
	return (
		<div className="expense">
			<div className="name">
				{props.img && <img src={props.img} alt="" />}
				<p>{props.title}</p>
			</div>
			<div className="type">{props.type}</div>
			<div className="amount">{props.amount}</div>
			<div className="date">{props.date}</div>
			<div className="invoice">{props.invoice}</div>
			{props.edit && <Button value="Edit" onClick={props.edit} />}
		</div>
	);
}
