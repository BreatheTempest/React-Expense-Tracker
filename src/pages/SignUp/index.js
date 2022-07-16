import './style.css';

import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';

import img from '../../assets/images/signup.svg';
import googleIcon from '../../assets/icons/Google.svg';
import swoosh from '../../assets/swoosh.svg';

export default function Signup() {
	const { signup, setDisplayName, signInGoogle } = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			signup(data.email, data.password)
				.then((newUser) => {
					setLoading(true);
					setDisplayName(newUser.user, data.name);
					navigate('/', { replace: true });
				})
				.catch(() => setErrors({ name: 'Failed to create an account' }));
		}
		setLoading(false);
	};

	//Check for errors and set Errors
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
		if (!/^[a-zA-Z\s]+$/g.test(data.name) && data.name !== '') {
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
							disabled={loading}
							onClick={(e) => {
								e.preventDefault();
								signInGoogle(setLoading, navigate, setErrors);
							}}
						/>
					</form>
					<div className="redirect">
						<p>Already have an account?</p>
						<Link to="/signin">
							Sing in
							<img src={swoosh} alt="" />
						</Link>
					</div>
				</div>
			</div>
			<img className="img-half" src={img} alt="" />
		</div>
	);
}
