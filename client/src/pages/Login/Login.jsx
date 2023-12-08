import styles from './Login.module.css';
import MyDashboardIcon from '../../assets/MyDashboardIcon.png';
import CloseIcon from '../../assets/CloseIcon.svg';
import Error from '../../assets/Error.svg';
import ArrowBtn from '../../assets/ArrowBtn.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const Login = () => {
	const initialValue = {
		username: '',
		password: '',
	};

	const [user, setUser] = useState(initialValue);
	const [showUsernameInput, setShowUsernameInput] = useState(true);
	const [errors, setErrors] = useState({});
	const [apiError, setApiError] = useState(null);
	const navigate = useNavigate();

	const handleData = e => {
		const { name, value } = e.target;
		setErrors(prevErrors => ({...prevErrors, [name]: ''}));
		setApiError(null)
		setUser({ ...user, [name]: value });
	};

	const handleNextButton = e => {
		e.preventDefault();
		if (!user.username) {
			setErrors({ username: 'Username is required.' });
		} else {
			setErrors({});
			setShowUsernameInput(false);
		}
	};

	const saveData = async e => {
		e.preventDefault();
		if (!user.password) {
			setErrors({ password: 'Password is required' });
		} else {
			setErrors({});
			try {
				const loggedUser = {
					username: user.username,
					password: user.password,
				};

				const response = await axios.post(
					`${import.meta.env.VITE_AXIOS_URI}/users/login`,
					loggedUser,
				);

				const token = response.data.authToken;

				sessionStorage.setItem('token', token);

				navigate('/myboard');
			} catch (error) {
				if (error.response) {
					console.error(
						'Server responded with an error:',
						error.response.data,
					);
					console.error('Status code:', error.response.status);

					setApiError(
						'Error logging in. Please check your credentials.',
					);
				} else if (error.request) {
					console.error('No response received from the server');

					setApiError(
						'No response received from the server. Please try again later.',
					);
				} else {
					console.error(
						'Error setting up the request:',
						error.message,
					);

					setApiError(
						'An unexpected error occurred. Please try again later.',
					);
				}
			}
		}
	};

	return (
		<div className={styles.loginPage}>
			<Link to={'/'} className={styles.link}>
				<img
					src={CloseIcon}
					alt='Close-icon'
					className={styles.closeIcon}
				/>
			</Link>

			<form className={styles.loginForm}>
				<div className={styles.header}>
					<img
						src={MyDashboardIcon}
						alt='MyDashboard - Icon'
						className={styles.icon}
					/>
					<h1 className={styles.title}>Login to MyDashboard</h1>
					<h6 className={styles.text}>Your life, under control.</h6>
				</div>

				{showUsernameInput ? (
					<span className={styles.fakeInput}>
						<input
							type='text'
							autoComplete='off'
							placeholder='username'
							name='username'
							value={user.username}
							onChange={handleData}
						/>
						<button
							className={styles.arrowBtn}
							onClick={handleNextButton}>
							<img src={ArrowBtn} alt='NextStep' />
						</button>
					</span>
				) : (
					<span className={styles.fakeInput}>
						<input
							type='password'
							autoComplete='off'
							placeholder='password'
							name='password'
							value={user.password}
							onChange={handleData}
						/>
						<button className={styles.arrowBtn} onClick={saveData}>
							<img src={ArrowBtn} alt='NextStep' />
						</button>
					</span>
				)}
			</form>

			{errors.username && (
				<p className={styles.error}>
					<img
						src={Error}
						alt='Error icon'
						className={styles.errorIcon}
					/>
					{errors.username}
				</p>
			)}

			{errors.password && (
				<p className={styles.error}>
					<img
						src={Error}
						alt='Error icon'
						className={styles.errorIcon}
					/>
					{errors.password}
				</p>
			)}

			{apiError && (
				<p className={styles.error}>
					<img
						src={Error}
						alt='Error icon'
						className={styles.errorIcon}
					/>
					{apiError}
				</p>
			)}

			<div className={styles.loginFooter}>
				<p>
					No account yet?{' '}
					<Link to={'/signup'} className={styles.link}>
						Sign up.
					</Link>
				</p>
			</div>
		</div>
	);
};
