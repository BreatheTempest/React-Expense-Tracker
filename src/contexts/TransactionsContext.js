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

	const value = {
		transactions,
		createTransaction,
		updateTransaction,
		deleteTransaction,
	};
	return (
		<TransactionsContext.Provider value={value}>
			{children}
		</TransactionsContext.Provider>
	);
}
