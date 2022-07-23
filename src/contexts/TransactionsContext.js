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
