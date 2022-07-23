import Transaction from '../../components/Transaction/Transaction';
import Card from '../../components/Card/Card';
import Button from '../../components/Button';
import './Dashboard.css';

import expand from '../../assets/icons/expand-right.svg';
import wallet from '../../components/icons/wallet.svg';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../../contexts/TransactionsContext';
import Chart from '../../components/Chart/Chart';
import Select from 'react-select';

export default function Dashboard() {
	const {
		transactions,
		setTimePeriod,
		incomeThroughTime,
		expensesThroughTime,
		timePeriod,
	} = useTransactions();

	const totalIncome = incomeThroughTime.reduce(
		(total, item) => total + +item.amount,
		0
	);

	const totalExpenses = expensesThroughTime.reduce(
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

	const options = [
		{
			value: 7,
			label: 'Last Week',
		},
		{
			value: 30,
			label: 'Last Month',
		},
		{
			value: 300,
			label: 'All Time',
		},
	];

	return (
		<div className="dashboard">
			<section className="right-section">
				<div className="dashboard-top">
					<h3>Statistics</h3>
					<Select
						options={options}
						value={timePeriod === 7 ? options[0] : options[1]}
						className="select-container"
						classNamePrefix="select"
						onChange={(e) => setTimePeriod(() => e.value)}
					/>
				</div>
				<div className="spending">
					<Card
						icon={wallet}
						rate={
							timePeriod === 7
								? 'Weekly Balance'
								: timePeriod === 30
								? 'Monthly Balance'
								: 'Total Balance'
						}
						value={`${
							totalIncome - totalExpenses < 0
								? `-$${-totalIncome - -totalExpenses}`
								: `$${totalIncome - totalExpenses}`
						}`}
					/>
					<Card
						icon={wallet}
						rate={
							timePeriod === 7
								? 'Weekly Income'
								: timePeriod === 30
								? 'Monthly Income'
								: 'Total Income'
						}
						value={`$${totalIncome}`}
					/>
					<Card
						icon={wallet}
						rate={
							timePeriod === 7
								? 'Weekly Spending'
								: timePeriod === 30
								? 'Monthly Spending'
								: 'Total Spending'
						}
						value={`-$${totalExpenses}`}
					/>
				</div>
				<Chart />
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
					<div className="transactions-table">{transactionsArr}</div>
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
