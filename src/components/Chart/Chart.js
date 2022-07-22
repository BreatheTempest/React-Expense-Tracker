import './Chart.css';
import { useTransactions } from '../../contexts/TransactionsContext';
import {
	Tooltip,
	Legend,
	ResponsiveContainer,
	LineChart,
	Line,
	YAxis,
	XAxis,
} from 'recharts';

export default function Chart(props) {
	const { transactions } = useTransactions();
	const income = transactions.filter((item) => item.transaction === 'Income');
	const expense = transactions.filter((item) => item.transaction === 'Expense');
	console.log(income);

	return (
		<ResponsiveContainer width="100%" height={250}>
			<LineChart data={transactions}>
				<Legend />
				<Tooltip />
				<XAxis dataKey="date" />
				<YAxis />
				<Line type="monotone" data={income} dataKey="amount" />
				<Line type="monotone" data={expense} dataKey="amount" />
			</LineChart>
		</ResponsiveContainer>
	);
}
