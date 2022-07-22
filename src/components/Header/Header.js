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
			case '/transactions':
				return 'Transactions';
			default:
				return 'Dashboard';
		}
	};

	return (
		<div
			className="header-container"
			style={{ display: currentUser ? '' : 'none' }}
		>
			<h2>{title}</h2>
			<div className="header-profile">
				<p>
					{currentUser && currentUser.photoURL && (
						<img
							className="picture"
							src={currentUser.photoURL}
							alt={ProfilePicture}
						/>
					)}
					{currentUser && currentUser.displayName}
				</p>
				<img src={ArrowDown} alt={ArrowDown} />
			</div>
		</div>
	);
}
