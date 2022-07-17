import ProfilePicture from '../../assets/profil-picutre.svg';
import ArrowDown from '../../assets/arrow-down.svg';
import './Header.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
	const [title, setTitle] = useState('');
	const location = useLocation();
	const { currentUser } = useAuth();

	useEffect(() => {
		setTitle(changeTitle());
	}, [location]);

	const changeTitle = () => {
		switch (window.location.pathname) {
			case '/settings':
				return 'Settings';
			case '/expenses':
				return 'Expenses';
			default:
				return 'Dashboard';
		}
	};

	return (
		<div
			className="header-container"
			style={{ display: currentUser ? '' : 'none' }}
		>
			<h1>{title}</h1>
			<div className="header-profile">
				<p>
					<img src={ProfilePicture} alt={ProfilePicture} />
					Mahfuzul Nabil
				</p>
				<img src={ArrowDown} alt={ArrowDown} />
			</div>
		</div>
	);
}
