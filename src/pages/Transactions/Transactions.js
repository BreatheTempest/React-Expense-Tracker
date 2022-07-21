import './Transactions.css';
import { nanoid } from 'nanoid';
import wallet from '../../components/icons/wallet.svg';
import Expense from '../../components/Expense/Expense';
import { useExpenses } from '../../contexts/ExpensesContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ManageExpense from '../../components/ManageExpense/ManageExpense';
import { useState } from 'react';

export default function Transactions() {
	const { expenses, createExpense, updateExpense, deleteExpense } =
		useExpenses();
	const [isOpen, setIsOpen] = useState(false);
	const [currentExpenseId, setCurrentExpenseId] = useState('');
	const [currentExpense, setCurrentExpense] = useState('');

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

	async function edit(e, id) {
		e.stopPropagation();
		setCurrentExpenseId(id);
		setCurrentExpense(expenses.find((expense) => expense.invoice === id));
		setIsOpen(true);
	}

	async function handleSubmit(data) {
		setIsOpen(false);
		const id = nanoid();
		const invoice = {
			invoice: id,
		};
		const expenseData = {
			title: data.title,
			type: data.type,
			amount: data.amount,
			date: data.date,
		};
		if (!currentExpenseId) {
			console.log('created');
			await createExpense(id, { ...expenseData, ...invoice });
		} else {
			console.log('edited');
			await updateExpense(currentExpenseId, expenseData);
		}
	}

	async function handleDelete() {
		await deleteExpense(currentExpenseId);
		setCurrentExpense('');
		setCurrentExpenseId('');
		setIsOpen(false);
	}

	return (
		<section className="expenses">
			{isOpen && (
				<ManageExpense
					handleClick={handleSubmit}
					close={(e) => {
						e.preventDefault();
						setIsOpen(false);
						setCurrentExpense('');
						setCurrentExpenseId('');
					}}
					currentExpense={currentExpense}
					setCurrentExpense={setCurrentExpense}
					handleDelete={handleDelete}
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
