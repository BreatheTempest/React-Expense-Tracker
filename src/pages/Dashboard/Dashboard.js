import Transaction from '../../components/Transaction/Transaction';
import Card from '../../components/Card/Card';
import Button from '../../components/Button';
import './Dashboard.css';

import expand from '../../assets/icons/expand-right.svg';
import wallet from '../../components/icons/wallet.svg';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../../contexts/TransactionsContext';
import Chart from '../../components/Chart/Chart';

export default function Dashboard() {
	const { transactions, income, expenses } = useTransactions();

	const totalIncome = income.reduce((total, item) => total + +item.amount, 0);

	const totalExpenses = expenses.reduce(
		(total, item) => total + +item.amount,
		0
	);

	const navigate = useNavigate();

	const transactionsArr = transactions.map((transaction) => (
		<Transaction
			img={wallet}
			mode={transaction.transaction}
			key={transaction.invoice}
			title={transaction.title}
			type={transaction.type}
			amount={transaction.amount}
			date={transaction.date}
			class="transaction-dashboard"
		/>
	));

	return (
		<div className="dashboard">
			<section className="right-section">
				<div className="spending">
					<Card
						icon={wallet}
						rate="Balance"
						value={`${
							totalIncome - totalExpenses < 0
								? `-$${-totalIncome - -totalExpenses}`
								: `$${totalIncome - totalExpenses}`
						}`}
					/>
					<Card icon={wallet} rate="Total income" value={`$${totalIncome}`} />
					<Card
						icon={wallet}
						rate="Total spending"
						value={`-$${totalExpenses}`}
					/>
				</div>
				<div className="graph">
					<Chart />
				</div>
				<div className="recent-transactions">
					<div className="transactions-title">
						<h2>Recent Transactions</h2>
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
					{transactionsArr}
				</div>
			</section>
			<section className="recurring">
				<div className="transactions-title">
					<h2>Recurring Transactions</h2>
					<Button value="View All" icon={expand} />
				</div>
			</section>
		</div>
	);
}
