import React from 'react';
import './Transaction.css';
import Button from '../Button';

export default function Transaction(props) {
	return (
		<div className={props.class}>
			<div className="name">
				{props.img && <img src={props.img} alt="" />}
				<p>{props.title}</p>
			</div>
			<p className="type">{props.type}</p>
			<p
				className={`amount ${props.mode === 'Expense' ? 'expense' : 'income'}`}
			>
				{props.mode === 'Expense' && '-'}${props.amount}
			</p>
			<p className="date">{props.date}</p>
			<p className="invoice">{props.invoice}</p>
			{props.edit && (
				<Button
					class="transaction-button"
					value="Edit"
					onClick={(e) => props.edit(e, props.invoice)}
				/>
			)}
		</div>
	);
}
