import './style.css';

import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';

import img from '../../assets/images/signup.svg';
import googleIcon from '../../assets/icons/Google.svg';

export default function Signup() {
	const { signup, setDisplayName } = useAuth();
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(errors);
		if (Object.keys(errors).length === 0) {
			signup(data.email, data.password)
				.then((newUser) => setDisplayName(newUser, data.name))
				.catch((err) => console.log(err));
		}
	};

	const handleChange = async (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	//Check for errors
	useEffect(() => {
		setErrors({});
		if (data.password.length < 6 && data.password !== '') {
			setErrors((prev) => ({
				...prev,
				password: 'Password is too short',
			}));
		}
		if (!/.+@.+\..+/.test(data.email) && data.email !== '') {
			setErrors((prev) => ({
				...prev,
				email: 'Email is incorrect',
			}));
		}
		if (!/[^0-9]*/gi.test(data.name) && data.name !== '') {
			setErrors((prev) => ({
				...prev,
				name: 'Name can contain only letters',
			}));
		}
	}, [data]);

	return (
		<div className="auth-page">
			<div className="form-half">
				<div className="form-container">
					<Logo />
					<form onSubmit={handleSubmit}>
						<h2 className="title">Create new account</h2>
						<p className="sub-title">Welcome back! Please enter your details</p>
						<Input
							name="name"
							label="Full Name"
							placeholder="Mahfuzul Nabil"
							handleInput={handleChange}
							value={data.name}
							error={errors.name}
						/>
						<Input
							name="email"
							label="Email"
							placeholder="example@gamil.com"
							handleInput={handleChange}
							value={data.email}
							error={errors.email}
						/>
						<Input
							type="password"
							name="password"
							label="Password"
							placeholder="••••••"
							handleInput={handleChange}
							value={data.password}
							error={errors.password}
							autoComplete="password"
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
