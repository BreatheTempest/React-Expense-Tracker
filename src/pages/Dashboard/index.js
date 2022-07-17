import React, { useState } from 'react';
import Expense from '../../components/Expense/Expense';
import Button from '../../components/Button';
import './style.css';

export default function Dashboard() {
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
			title={expense.title}
			type={expense.type}
			amount={expense.amount}
			date={expense.date}
		/>
	));

	return (
		<div className="dashboard">
			<section className="right-section">
				<div className="spending"></div>
				<div className="graph"></div>
				<div className="recent-expenses">
					<div className="expenses-title">
						<h2>Recent Expenses</h2>
						<Button value="View All" />
					</div>
					<div className="columns">
						<p>NAME/BUSINESS</p>
						<p>TYPE</p>
						<p>AMOUNT</p>
						<p>DATE</p>
					</div>
					{expenses}
				</div>
			</section>
			<section className="recurring">
				<div className="expenses-title">
					<h2>Recurring Expenses</h2>
					<Button value="View All" />
				</div>
			</section>
		</div>
	);
}
