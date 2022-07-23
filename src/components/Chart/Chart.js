import './Chart.css';
import { useTransactions } from '../../contexts/TransactionsContext';
import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line, Bar } from 'react-chartjs-2';
export default function Chart(props) {
	const { lastWeekIncome, lastWeekExpenses, lastWeek } = useTransactions();

	const labels = lastWeek.sort();
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Chart.js Line Chart',
			},
		},
	};

	const data = {
		labels,
		datasets: [
			{
				label: 'Income',
				data: lastWeekIncome.map((item) => item.amount).reverse(),
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
				borderColor: 'rgb(53, 162, 235)',
			},
			{
				label: 'Expense',
				data: lastWeekExpenses.map((item) => item.amount).reverse(),
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
				borderColor: 'rgb(255, 99, 132)',
			},
		],
	};

	return <Line options={options} data={data} />;
}
