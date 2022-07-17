import React, { useState } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import Edit from '../../assets/edit.svg';
import date from '../../assets/icons/date.svg';
import emailIcon from '../../assets/icons/email.svg';
import lock from '../../assets/icons/lock.svg';
import eye from '../../assets/icons/eye.svg';
import './Settings.css';
import { useAuth } from '../../contexts/AuthContext';

export default function Settings() {
	const { updateUser, updateUsersEmail, updateUsersPassword, userDetails } =
		useAuth();

	const [editSettings, setEditSettings] = useState(false);

	const [firstName, setFirstName] = useState(userDetails.firstName);
	const [lastName, setLastName] = useState(userDetails.lastName);
	const [dateOfBirth, setDateOfBirth] = useState(userDetails.dateOfBirth);
	const [mobileNumber, setMobileNumber] = useState(userDetails.mobileNumber);
	const [email, setEmail] = useState(userDetails.email);
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const [passwordInput, setPasswordInput] = useState('password');
	const [passwordConfirmInput, setPasswordConfirmInput] = useState('password');

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
		<section className="settings">
			<form className="settings-container">
				<div className="settings-title span-two">
					<h2>Account Information</h2>
					<p>Update your account information</p>
				</div>
				<div className="settings-header span-two">
					<h3>Personal Information</h3>
					<Button
						class="settings-edit"
						icon={Edit}
						value="Edit"
						onClick={(e) => {
							setEditSettings((prev) => !prev);
							e.preventDefault();
						}}
					/>
				</div>
				<Input
					name="first-name"
					label="First Name"
					type="text"
					placeholder="Mahfuzul"
					value={firstName}
					handleInput={(e) => setFirstName(e.target.value)}
					readOnly={!editSettings}
					icon={Edit}
				/>
				<Input
					name="last-name"
					label="Last Name"
					type="text"
					placeholder="Nabil"
					value={lastName}
					handleInput={(e) => setLastName(e.target.value)}
					readOnly={!editSettings}
				/>
				<div className="icon-input">
					<Input
						label="Date of Birth"
						name="dateOfBirth"
						value={dateOfBirth}
						placeholder="27/09/1998"
						handleInput={(e) => setDateOfBirth(e.target.value)}
						readOnly={!editSettings}
					/>
					<img src={date} alt="" />
				</div>
				<Input
					label="Mobile Number"
					name="mobileNumber"
					value={mobileNumber}
					type="number"
					placeholder="+123 456 7890"
					handleInput={(e) => setMobileNumber(e.target.value)}
					readOnly={!editSettings}
				/>
				<div className="icon-input span-two">
					<Input
						name="email"
						label="Email"
						type="email"
						placeholder="example@gamil.com"
						autoComplete="email"
						value={email}
						handleInput={(e) => setEmail(e.target.value)}
						readOnly={!editSettings}
					/>
					<img src={emailIcon} alt="" />
				</div>
				<div className="icon-input password">
					<img src={lock} alt="" className="start" />
					<Input
						label="New Password"
						type={passwordInput}
						placeholder="••••••"
						name="password"
						value={password}
						autoComplete="new-password"
						handleInput={(e) => setPassword(e.target.value)}
						readOnly={!editSettings}
					/>
					<Button
						icon={eye}
						onClick={(e) => {
							setPasswordInput((prev) =>
								prev === 'password' ? 'text' : 'password'
							);
							e.preventDefault();
						}}
					/>
				</div>
				<div className="icon-input password">
					<img src={lock} alt="" className="start" />
					<Input
						label="Confirm Password"
						type={passwordConfirmInput}
						placeholder="••••••"
						name="confirm-password"
						autoComplete="new-password"
						value={passwordConfirm}
						handleInput={(e) => setPasswordConfirm(e.target.value)}
						readOnly={!editSettings}
					/>
					<Button
						icon={eye}
						onClick={(e) => {
							setPasswordConfirmInput((prev) =>
								prev === 'password' ? 'text' : 'password'
							);
							e.preventDefault();
						}}
					/>
				</div>
				{editSettings && (
					<Button class="settings-btn" value="Update" onSubmit={handleSubmit} />
				)}
			</form>
		</section>
	);
}
