import './style.css';
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

	const expensesArr = expenses.map((expense) => (
		<Expense
			img={wallet}
			key={expense.invoice}
			title={expense.title}
			type={expense.type}
			amount={expense.amount}
			date={expense.date}
			invoice={expense.invoice}
			edit={() => true}
			class="expense-expenses"
		/>
	));
	async function handleClick(data) {
		setIsOpen(false);
		const id = nanoid();
		await createExpense({
			title: data.title,
			type: data.type,
			amount: data.amount,
			date: data.date,
			invoice: id,
		});
	}

	return (
		<section className="expenses">
			{isOpen && <CreateExpense handleClick={handleClick} />}
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
