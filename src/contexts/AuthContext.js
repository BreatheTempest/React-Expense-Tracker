import React, { createContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	GoogleAuthProvider,
	signInWithPopup,
	updateEmail,
	updatePassword,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [userDetails, setUserDetails] = useState({});
	const [loading, setLoading] = useState(true);
	const provider = new GoogleAuthProvider();

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function signInGoogle(setLoading, navigate, setErrors) {
		signInWithPopup(auth, provider)
			.then(() => {
				setLoading(true);
				navigate('/', { replace: true });
			})
			.catch(() => setErrors({ email: 'Failed to create an account' }));
		setLoading(false);
	}
	function logout() {
		return signOut(auth);
	}
	function setDisplayName(user, name) {
		return updateProfile(user, {
			displayName: name,
		});
	}
	function updateUsersEmail(email) {
		return updateEmail(currentUser, email);
	}
	function updateUsersPassword(password) {
		return updatePassword(currentUser, password);
	}
	function updateUser(update) {
		return updateDoc(doc(db, 'users', currentUser.uid), update);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	useEffect(() => {
		const getUserDetails = async () => {
			if (currentUser) {
				const docRef = doc(db, 'users', currentUser.uid);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					setUserDetails(docSnap.data());
				} else {
					const userInfo = {
						email: currentUser.email,
						displayName: currentUser.displayName,
					};
					await setDoc(docRef, userInfo);
					setUserDetails(userInfo);
				}
			}
		};
		getUserDetails();
	}, [currentUser]);

	const value = {
		currentUser,
		userDetails,
		signup,
		login,
		signInGoogle,
		logout,
		updateUsersEmail,
		updateUsersPassword,
		setDisplayName,
		updateUser,
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
