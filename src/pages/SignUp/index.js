import './style.css';

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';

import img from '../../assets/images/signup.svg';
import googleIcon from '../../assets/icons/Google.svg';

export default function Signup() {
	return (
		<div className="auth-page">
			<div className="form-half">
				<div className="form-container">
					<Logo />
					<form>
						<h2 className="title">Create new account</h2>
						<p className="sub-title">Welcome back! Please enter your details</p>
						<Input
							name="full-name"
							label="Full Name"
							placeholder="Mahfuzul Nabil"
						/>
						<Input name="email" label="Email" placeholder="example@gamil.com" />
						<Input
							type="password"
							name="password"
							label="Password"
							placeholder="••••••"
						/>
						<Button class="btn btn-primary" value="Create Account" />
						<Button
							icon={googleIcon}
							class="btn btn-secondary"
							value="Sign up with google"
						/>
					</form>
					<p className="redirect">
						Already have an account? <Link to="/signin">Sign in</Link>
					</p>
				</div>
			</div>
			<img className="img-half" src={img} alt="" />
		</div>
	);
}
