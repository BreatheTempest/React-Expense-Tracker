import './style.css';
import wallet from '../../components/icons/wallet.svg';
import Expense from '../../components/Expense/Expense';
import { useState } from 'react';

export default function Transactions() {
	const [data, setData] = useState([
		{
			title: 'Netflix',
			amount: '$15',
			type: 'Entertainment',
			date: '06.06.06',
			invoice: '1234',
		},
	]);

	const expenses = data.map((expense) => (
		<Expense
			img={wallet}
			key={expense.date}
			title={expense.title}
			type={expense.type}
			amount={expense.amount}
			date={expense.date}
			invoice={expense.invoice}
			edit={true}
			class="expense-expenses"
		/>
	));

	return (
		<section className="expenses">
			<div className="expenses-top-bar"></div>
			<div className="expenses-categories">
				<p>NAME/BUSINESS</p>
				<p>TYPE</p>
				<p>AMOUNT</p>
				<p>DATE</p>
				<p>INVOICE ID</p>
				<p>ACTION</p>
			</div>
			{expenses}
		</section>
	);
}
