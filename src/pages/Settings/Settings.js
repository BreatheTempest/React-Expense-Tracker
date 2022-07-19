import React, { useEffect, useState } from 'react';

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

	useEffect(() => {
		setData({
			firstName: userDetails.firstName,
			lastName: userDetails.lastName,
			dateOfBirth: userDetails.dateOfBirth,
			mobileNumber: userDetails.mobileNumber,
			email: userDetails.email,
			password: '',
			passwordConfirm: '',
		});
	}, [userDetails]);

	const [editSettings, setEditSettings] = useState(false);

	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		mobileNumber: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});

	const [passwordInput, setPasswordInput] = useState('password');

	async function handleSubmit(e) {
		e.preventDefault();
		const {
			firstName,
			lastName,
			dateOfBirth,
			mobileNumber,
			email,
			password,
			passwordConfirm,
		} = data;

		if (email) {
			await updateUsersEmail(email);
			try {
				await updateUser({
					firstName,
					lastName,
					dateOfBirth,
					mobileNumber,
					email,
				});
			} catch (err) {
				console.log(err);
			}
		}
		if (password && password === passwordConfirm) {
			updateUsersPassword(password);
		}
		setEditSettings(false);
	}

	function handleInput(e) {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
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
					name="firstName"
					label="First Name"
					type="text"
					placeholder="Mahfuzul"
					value={data.firstName}
					handleInput={handleInput}
					readOnly={!editSettings}
					icon={Edit}
				/>
				<Input
					name="lastName"
					label="Last Name"
					type="text"
					placeholder="Nabil"
					value={data.lastName}
					handleInput={handleInput}
					readOnly={!editSettings}
				/>
				<div className="icon-input">
					<Input
						label="Date of Birth"
						name="dateOfBirth"
						value={data.dateOfBirth}
						placeholder="27/09/1998"
						handleInput={handleInput}
						readOnly={!editSettings}
					/>
					<img src={date} alt="" />
				</div>
				<Input
					label="Mobile Number"
					name="mobileNumber"
					value={data.mobileNumber}
					type="number"
					placeholder="+123 456 7890"
					handleInput={handleInput}
					readOnly={!editSettings}
				/>
				<div className="icon-input span-two">
					<Input
						name="email"
						label="Email"
						type="email"
						placeholder="example@gamil.com"
						autoComplete="email"
						value={data.email}
						handleInput={handleInput}
						readOnly={!editSettings}
					/>
					<img src={emailIcon} alt="" />
				</div>
				<div className="icon-input password">
					<img src={lock} alt="" className="start" />
					<Input
						label="New Password"
						type={passwordInput}
						placeholder={editSettings ? '' : '••••••'}
						name="password"
						value={data.password}
						autoComplete="new-password"
						handleInput={handleInput}
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
						type={passwordInput}
						placeholder={editSettings ? '' : '••••••'}
						name="passwordConfirm"
						autoComplete="new-password"
						value={data.passwordConfirm}
						handleInput={handleInput}
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
				{editSettings && (
					<Button
						class="settings-btn"
						value="Update"
						onClick={(e) => handleSubmit(e)}
					/>
				)}
			</form>
		</section>
	);
}
