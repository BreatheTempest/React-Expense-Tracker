import './ManageTransaction.css';
import Input from '../Input';
import Button from '../Button';
import Select from 'react-select';
import { createPortal } from 'react-dom';
import { useState } from 'react';

import { useDarkMode } from '../../contexts/DarkModeContext';

export default function CreateTransaction(props) {
	const { darkMode } = useDarkMode();

	const { title, amount, type, date, transaction } = props.currentTransaction;

	const currentDate = new Date().toISOString().substring(0, 10);

	const [data, setData] = useState({
		transaction: transaction || 'Income',
		title: title || '',
		amount: amount || '',
		type: type || '',
		date: date || currentDate,
		recurring: false,
	});

	const options =
		data.transaction === 'Expense'
			? [
					{
						value: 'Food',
						label: 'Food',
					},
					{
						value: 'Shopping',
						label: 'Shopping',
					},
					{
						value: 'Housing',
						label: 'Housing',
					},
					{
						value: 'Entertainment',
						label: 'Entertainment',
					},
					{
						value: 'Investments',
						label: 'Investments',
					},
					{
						value: 'Others',
						label: 'Others',
					},
			  ]
			: [
					{
						value: 'Rental income',
						label: 'Rental income',
					},
					{
						value: 'Sale',
						label: 'Sale',
					},
					{
						value: 'Wage',
						label: 'Wage',
					},
					{
						value: 'Gifts',
						label: 'Gifts',
					},
					{
						value: 'Interests, dividends',
						label: 'Interests, dividends',
					},
					{
						value: 'Others',
						label: 'Others',
					},
			  ];

	function handleChange(e) {
		const { name, value } = e.target;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	return createPortal(
		<div className="overlay">
			<form className={`modal-transaction ${darkMode ? 'dark' : ''}`}>
				<div className="modal-header">
					<h3>
						{props.currentTransaction ? 'Edit' : 'Create a New'} Transaction
					</h3>
					<Button value="x" onClick={props.close} class="close" />
				</div>

				<div className="modal-buttons">
					<Button
						value="Income"
						class={`income ${data.transaction === 'Income' ? 'active' : ''}`}
						onClick={(e) => {
							e.preventDefault();
							setData((prevData) => ({
								...prevData,
								transaction: 'Income',
							}));
						}}
					/>
					<Button
						value="Expense"
						class={`expense ${data.transaction === 'Expense' ? 'active' : ''}`}
						onClick={(e) => {
							e.preventDefault();
							setData((prevData) => ({
								...prevData,
								transaction: 'Expense',
							}));
						}}
					/>
				</div>
				<Input
					placeholder="Title"
					handleInput={handleChange}
					value={data.title}
					name="title"
				/>
				<Input
					placeholder="Amount"
					type="number"
					handleInput={handleChange}
					value={data.amount}
					name="amount"
				/>
				<Select
					options={options}
					isSearchable
					isClearable
					name="type"
					value={
						data.type && {
							label: data.type,
							value: data.type,
						}
					}
					className="select-container"
					classNamePrefix="select"
					placeholder="Type"
					onChange={(e) =>
						setData((prevData) => ({
							...prevData,
							type: e ? e.value : '',
						}))
					}
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
				<div className="modal-buttons">
					<Button
						value={props.currentTransaction ? 'Edit' : 'Add'}
						class="add"
						onClick={(e) => {
							e.preventDefault();
							props.handleClick(data);
						}}
					/>
					{props.currentTransaction && (
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
