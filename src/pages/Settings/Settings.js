import React, { useState } from 'react';

import Input from '../../components/Input';

import Edit from '../../assets/edit.svg';
import './Settings.css';
import { useAuth } from '../../contexts/AuthContext';

export default function Settings() {
	const { updateUser, updateUsersEmail, updateUsersPassword } = useAuth();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [mobileNumber, setMobileNumber] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();
		const userInfo = {
			firstName,
			lastName,
			dateOfBirth,
			mobileNumber,
		};
		await updateUser(userInfo);
		if (email) {
			await updateUsersEmail(email);
			await updateUser({ email });
		}
		if (password && password === passwordConfirm) {
			updateUsersPassword(password);
		}
	}

	return (
		<form className="settings-container" onSubmit={handleSubmit}>
			<div className="settings-title">
				<h2>Account Information</h2>
				<p>Update your account information</p>
			</div>
			<div className="settings-header">
				<h3>Personal Information</h3>
				<div className="settings-edit">
					<img src={Edit} alt="Edit" />
					<p>Edit</p>
				</div>
			</div>
			<div className="settings-input-containers">
				<Input
					name="first-name"
					label="First Name"
					type="text"
					placeholder="Mahfuzul"
					value={firstName}
					handleInput={(e) => setFirstName(e.target.value)}
				/>
				<Input
					name="last-name"
					label="Last Name"
					type="text"
					placeholder="Nabil"
					value={lastName}
					handleInput={(e) => setLastName(e.target.value)}
				/>
			</div>
			<div className="settings-input-containers">
				<Input
					label="Date of Birth"
					value={dateOfBirth}
					handleInput={(e) => setDateOfBirth(e.target.value)}
				/>
				<Input
					label="Mobile Number"
					value={mobileNumber}
					type="number"
					handleInput={(e) => setMobileNumber(e.target.value)}
				/>
			</div>
			<Input
				name="email"
				label="Email"
				type="email"
				placeholder="example@gamil.com"
				value={email}
				handleInput={(e) => setEmail(e.target.value)}
			/>
			<div className="settings-input-containers">
				<Input
					label="Password"
					type="password"
					placeholder="••••••"
					name="password"
					value={password}
					handleInput={(e) => setPassword(e.target.value)}
				/>
				<Input
					label="Confirm Password"
					type="password"
					placeholder="••••••"
					name="confirm-password"
					value={passwordConfirm}
					handleInput={(e) => setPasswordConfirm(e.target.value)}
				/>
			</div>
			<button>Update</button>
		</form>
	);
}
