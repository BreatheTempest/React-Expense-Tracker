import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RequireAuth({ children }) {
	const { currentUser } = useAuth();

	if (!currentUser) {
		return <Navigate to="/signin" />;
	}

	return children;
}
