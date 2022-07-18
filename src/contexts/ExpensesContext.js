import {
	getDoc,
	getDocs,
	doc,
	setDoc,
	updateDoc,
	onSnapshot,
	collection,
	addDoc,
} from 'firebase/firestore';

import { createContext, useContext, useState, useEffect } from 'react';

import { db } from '../firebase';

import { useAuth } from './AuthContext';

const ExpensesContext = createContext();

export function useExpenses() {
	return useContext(ExpensesContext);
}

export default function ExpensesProvider({ children }) {
	const { currentUser } = useAuth();
	const uid = currentUser && currentUser.uid;
	const [expenses, setExpenses] = useState([]);
	const notesRef = currentUser && collection(db, 'users', uid, 'expenses');

	useEffect(() => {
		if (currentUser) {
			onSnapshot(notesRef, async () => {
				const data = await getDocs(notesRef);
				const expensesArray = data.docs.map((doc) => doc.data());
				setExpenses(expensesArray);
			});
		}
	}, [currentUser]);

	function createExpense(data) {
		return addDoc(notesRef, data);
	}
	const value = { expenses, createExpense };
	return (
		<ExpensesContext.Provider value={value}>
			{children}
		</ExpensesContext.Provider>
	);
}
