import Expense from '../../components/Expense/Expense';
import Spending from '../../components/Spending/Spending';
import Button from '../../components/Button';
import './Dashboard.css';

import expand from '../../assets/icons/expand-right.svg';
import wallet from '../../components/icons/wallet.svg';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../../contexts/ExpensesContext';

export default function Dashboard() {
	const { expenses } = useExpenses();

	const navigate = useNavigate();

	const expensesArr = expenses.map((expense) => (
		<Expense
			img={wallet}
			key={expense.invoice}
			title={expense.title}
			type={expense.type}
			amount={expense.amount}
			date={expense.date}
			class="expense-dashboard"
		/>
	));

	return (
		<div className="dashboard">
			<section className="right-section">
				<div className="spending">
					<Spending icon={wallet} rate="Total spending" value="$5340.21" />
					<Spending icon={wallet} rate="Monthly spending" value="$250.80" />
					<Spending icon={wallet} rate="Daily spending" value="$10.25" />
				</div>
				<div className="graph"></div>
				<div className="recent-expenses">
					<div className="expenses-title">
						<h2>Recent Expenses</h2>
						<Button
							value="View All"
							icon={expand}
							onClick={() => navigate('transactions')}
						/>
					</div>
					<div className="dashboard-categories">
						<p>NAME/BUSINESS</p>
						<p>TYPE</p>
						<p>AMOUNT</p>
						<p>DATE</p>
					</div>
					{expensesArr}
				</div>
			</section>
			<section className="recurring">
				<div className="expenses-title">
					<h2>Recurring Expenses</h2>
					<Button value="View All" icon={expand} />
				</div>
			</section>
		</div>
	);
}
