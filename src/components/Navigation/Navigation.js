import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../../assets/logout.svg';
import Settings from '../../assets/settings.svg';
import Transactions from '../../assets/transaction.svg';
import Dashboard from '../../assets/dashboard.svg';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../Button';
import Logo from '../Logo';

import './Navigation.css';

export default function Navigation() {
	const { logout, currentUser } = useAuth();

	return (
		<div
			className="nav-container"
			style={{ display: currentUser ? '' : 'none' }}
		>
			<Logo />
			<nav className="nav-links">
				<NavLink to="/">
					<img src={Dashboard} alt={Dashboard} /> Dashboard
				</NavLink>
				<NavLink to="transactions">
					<img src={Transactions} alt={Transactions} />
					Expenses
				</NavLink>
				<NavLink to="settings">
					<img src={Settings} alt={Settings} />
					Settings
				</NavLink>
			</nav>
			<Button
				onClick={(e) => {
					e.preventDefault();
					logout();
				}}
				value="Logout"
				icon={Logout}
				class="nav-logout"
			>
				Logout
			</Button>
		</div>
	);
}
