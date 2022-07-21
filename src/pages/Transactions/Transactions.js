import './Transactions.css';
import { nanoid } from 'nanoid';
import wallet from '../../components/icons/wallet.svg';
import Expense from '../../components/Expense/Expense';
import { useExpenses } from '../../contexts/ExpensesContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CreateExpense from '../../components/CreateExpense/CreateExpense';
import { useState } from 'react';

export default function Transactions() {
	const { expenses, createExpense } = useExpenses();
	const [isOpen, setIsOpen] = useState(false);
	const [currentExpenseId, setCurrentExpenseId] = useState('');
	const [currentExpense, setCurrentExpense] = useState({});

	const expensesArr = expenses.map((expense) => (
		<Expense
			img={wallet}
			key={expense.invoice}
			title={expense.title}
			type={expense.type}
			amount={expense.amount}
			date={expense.date}
			invoice={expense.invoice}
			edit={edit}
			class="expense-expenses"
		/>
	));

	function edit(id) {
		setIsOpen(true);
		setCurrentExpenseId(id);
		setCurrentExpense(
			expenses.find((expense) => expense.invoice === currentExpenseId)
		);
	}

	async function handleClick(data) {
		setIsOpen(false);
		const id = nanoid();
		if (currentExpenseId === '') {
			await createExpense({
				title: data.title,
				type: data.type,
				amount: data.amount,
				date: data.date,
				invoice: id,
			});
		}
	}

	return (
		<section className="expenses">
			{isOpen && (
				<CreateExpense
					handleClick={handleClick}
					close={(e) => {
						e.preventDefault();
						setIsOpen(false);
						// setCurrentExpense('');
						// setCurrentExpenseId('');
					}}
					currentExpense={currentExpense}
					setCurrentExpense={setCurrentExpense}
				/>
			)}
			<div className="expenses-top-bar">
				<Input />
				<Button value="Create Expense" onClick={() => setIsOpen(true)} />
				<Button value="Filters" onClick={() => console.log('click')} />
			</div>
			<div className="expenses-categories">
				<p>NAME/BUSINESS</p>
				<p>TYPE</p>
				<p>AMOUNT</p>
				<p>DATE</p>
				<p>INVOICE ID</p>
				<p>ACTION</p>
			</div>
			{expensesArr}
		</section>
	);
}
