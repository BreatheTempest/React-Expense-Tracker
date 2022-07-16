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
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
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

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => [
			setCurrentUser(user),
			setLoading(false),
		]);
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		signInGoogle,
		logout,
		setDisplayName,
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
