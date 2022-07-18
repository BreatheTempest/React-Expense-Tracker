import './CreateExpense.css';
import Input from '../Input';
import Button from '../Button';
import { createPortal } from 'react-dom';
import { useState } from 'react';
export default function CreateExpense(props) {
	const [data, setData] = useState({
		title: '',
		amount: '',
		type: '',
		date: '',
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
			<form className="create-expense">
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
					handleInput={(e) => handleChange(e)}
					value={data.type}
					name="type"
				/>
				<div className="date-modal">
					<Input
						type="date"
						placeholder="Date"
						handleInput={(e) => handleChange(e)}
						value={data.date}
						name="date"
					/>
					<Input
						type="checkbox"
						name="Recurring"
						label="Recurring"
						class="checkbox"
						handleInput={(e) => handleChange(e)}
					/>
				</div>
				<Input type="image" handleInput={(e) => handleChange(e)} />
				<Button
					value="Add"
					onClick={(e) => {
						e.preventDefault();
						props.handleClick(data);
					}}
				/>
			</form>
		</div>,
		document.getElementById('portal')
	);
}
