import './ManageExpense.css';
import Input from '../Input';
import Button from '../Button';
import { createPortal } from 'react-dom';
import { useState } from 'react';

import { useDarkMode } from '../../contexts/DarkModeContext';

export default function CreateExpense(props) {
	const { darkMode } = useDarkMode();

	const { title, amount, type, date } = props.currentExpense || {};

	const currentDate = new Date().toISOString().substring(0, 10);

	const [data, setData] = useState({
		title: title || '',
		amount: amount || '',
		type: type || '',
		date: date || currentDate,
		recurring: false,
	});

	function handleChange(e) {
		const { name, value } = e.target;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	return createPortal(
		<div className="overlay">
			<form className={`modal-expense ${darkMode ? 'dark' : ''}`}>
				<div className="modal-header">
					<h3>{props.currentExpense ? 'Edit' : 'Create a New'} Expense</h3>
					<Button value="x" onClick={props.close} class="close" />
				</div>
				<Input
					placeholder="Title"
					handleInput={handleChange}
					value={data.title}
					name="title"
				/>
				<Input
					placeholder="Amount"
					handleInput={handleChange}
					value={data.amount}
					name="amount"
				/>
				<Input
					placeholder="Type"
					handleInput={handleChange}
					value={data.type}
					name="type"
				/>
				<div className="modal-date">
					<Input
						type="date"
						placeholder="Date"
						handleInput={handleChange}
						value={data.date}
						name="date"
					/>
					<Input
						type="checkbox"
						name="Recurring"
						label="Recurring"
						class="checkbox"
						handleInput={handleChange}
					/>
				</div>
				{/* <Input type="image" handleInput={(e) => handleChange(e)} /> */}
				<div className="modal-buttons">
					<Button
						value={props.currentExpense ? 'Edit' : 'Add'}
						class="add"
						onClick={(e) => {
							e.preventDefault();
							props.handleClick(data);
						}}
					/>
					{props.currentExpense && (
						<Button
							value="Delete"
							class="delete"
							onClick={(e) => {
								e.preventDefault();
								props.handleDelete();
							}}
						/>
					)}
				</div>
			</form>
		</div>,
		document.getElementById('portal')
	);
}
