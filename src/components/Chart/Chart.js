import './Chart.css';
import { useTransactions } from '../../contexts/TransactionsContext';
import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
export default function Chart(props) {
	const { incomeThroughTime, expensesThroughTime, dateArray } =
		useTransactions();

	const labels = dateArray.sort();
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
		},
	};

	const data = {
		labels,
		datasets: [
			{
				label: 'Income',
				fill: true,
				data: incomeThroughTime.map((item) => item.amount).reverse(),
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
				borderColor: 'rgb(53, 162, 235)',
			},
			{
				label: 'Expense',
				fill: true,
				data: expensesThroughTime.map((item) => item.amount).reverse(),
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
				borderColor: 'rgb(255, 99, 132)',
			},
		],
	};

	return <Bar options={options} data={data} />;
}
