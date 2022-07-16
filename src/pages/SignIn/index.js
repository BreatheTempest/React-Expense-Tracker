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
	const { login } = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			login(data.email, data.password)
				.then(() => {
					setLoading(true);
					navigate('/', { replace: true });
				})
				.catch((err) => {
					if (err.code === 'auth/user-not-found') {
						setErrors({ email: 'User not found' });
					} else if (err.code === 'auth/wrong-password') {
						setErrors({ password: 'Wrong Password' });
					} else {
						setErrors({ name: 'Something went wrong' });
					}
				});
		}
		setLoading(false);
	};

	const handleChange = async (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
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
	}, [data]);

	return (
		<div className="auth-page">
			<div className="form-half">
				<div className="form-container">
					<Logo />
					<form onSubmit={handleSubmit}>
						<h2 className="title">Welcome back</h2>
						<p className="sub-title">Welcome back! Please enter your details</p>
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
						<div className="password-options">
							<Input
								type="checkbox"
								name="remember"
								label="Remember for 30 Days"
							/>
							<Button value="Forgot password" />
						</div>
						<Button class="btn btn-primary" value="Sign In" />
						<Button
							icon={googleIcon}
							class="btn btn-secondary"
							value="Sign in with google"
							disabled={loading}
						/>
					</form>
					<p className="redirect">
						Don't have an account
						<Link to="/signup">
							Sign up for free
							<img src={swoosh} alt="" />
						</Link>
					</p>
				</div>
			</div>
			<img className="img-half" src={img} alt="" />
		</div>
	);
}
