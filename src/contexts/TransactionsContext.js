import { subDays } from 'date-fns';
import {
	getDocs,
	doc,
	setDoc,
	onSnapshot,
	collection,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore';

import { createContext, useContext, useState, useEffect } from 'react';

import { db } from '../firebase';

import { useAuth } from './AuthContext';

const TransactionsContext = createContext();

export function useTransactions() {
	return useContext(TransactionsContext);
}

export default function TransactionsProvider({ children }) {
	const { currentUser } = useAuth();
	const uid = currentUser && currentUser.uid;
	const [transactions, setTransactions] = useState([]);
	const notesRef = currentUser && collection(db, 'users', uid, 'transactions');
	const [sort, setSort] = useState(['date', 'asc']);
	const [timePeriod, setTimePeriod] = useState(7);
	const income = transactions.filter((item) => item.transaction === 'Income');
	const expenses = transactions.filter(
		(item) => item.transaction === 'Expense'
	);

	useEffect(() => {
		if (currentUser) {
			onSnapshot(notesRef, async () => {
				const data = await getDocs(notesRef);
				const transactionsArray = data.docs.map((doc) => doc.data());
				setTransactions(transactionsArray);
			});
		}
	}, [currentUser]);

	function createTransaction(id, data) {
		return setDoc(doc(db, 'users', uid, 'transactions', id), data);
	}
	function updateTransaction(id, data) {
		return updateDoc(doc(db, 'users', uid, 'transactions', id), data);
	}
	function deleteTransaction(id) {
		return deleteDoc(doc(db, 'users', uid, 'transactions', id));
	}

	const dateArray = Array(timePeriod)
		.fill()
		.map((item, index) =>
			subDays(new Date(), index).toISOString().substring(0, 10)
		);
	const incomeThroughTime = fillAmount(dateArray, income);
	const expensesThroughTime = fillAmount(dateArray, expenses);

	function sortTransactions(value, order) {
		if (value === 'amount') {
			const incomePart = income.sort((a, b) => a.amount - b.amount);
			const expensePart = expenses.sort((a, b) => a.amount - b.amount);
			setTransactions(
				order === 'asc'
					? [...incomePart, ...expensePart]
					: [...incomePart, ...expensePart].reverse()
			);
		} else
			return transactions.sort((a, b) => {
				const itemA = a[value].toUpperCase();
				const itemB = b[value].toUpperCase();
				if (itemA < itemB) {
					return order === 'asc' ? 1 : -1;
				}
				if (itemA > itemB) {
					return order === 'asc' ? -1 : 1;
				}
				return 0;
			});
	}

	useEffect(() => {
		if (transactions) {
			sortTransactions(sort[0], sort[1]);
			setTransactions((prevTransactions) => [...prevTransactions]);
		}
	}, [sort]);

	const value = {
		transactions,
		income,
		expenses,
		incomeThroughTime,
		expensesThroughTime,
		dateArray,
		createTransaction,
		updateTransaction,
		deleteTransaction,
		setTimePeriod,
		timePeriod,
		setSort,
	};
	return (
		<TransactionsContext.Provider value={value}>
			{children}
		</TransactionsContext.Provider>
	);
}

function fillAmount(dates, transactions) {
	return dates.reduce((array, date) => {
		transactions.forEach((item) => {
			const sameDate = array.find((newObj) => newObj.date === item.date);
			if (item.date === date) {
				if (sameDate) {
					sameDate.amount += item.amount;
				} else
					array.push({
						date: date,
						amount: item.amount,
					});
			}
		});
		const sameDate = array.find((newObj) => newObj.date === date);
		if (!sameDate) {
			array.push({
				date: date,
				amount: 0,
			});
		}
		return array;
	}, []);
}
