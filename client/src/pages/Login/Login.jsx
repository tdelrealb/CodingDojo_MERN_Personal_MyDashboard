import styles from './Login.module.css';
import myDashboardIcon from '../../assets/my-dashboard-icon-gradient.png';
import CloseIcon from '../../assets/close-icon.svg';
import NextIcon from '../../assets/next-icon.svg';
import ErrorIcon from '../../assets/error-icon.svg';
import { GoogleAuth } from '../../components/ExternalAuth/GoogleAuth.jsx'
import { GithubAuth } from '../../components/ExternalAuth/GithubAuth.jsx'; 
import { FacebookAuth } from '../../components/ExternalAuth/FacebookAuth.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment, useState } from 'react';
import axios from 'axios';

export const Login = () => {
	const initialValue = {
		username: '',
		password: '',
	};

	const [user, setUser] = useState(initialValue);
	const [showUsernameInput, setShowUsernameInput] = useState(true);
	const [errors, setErrors] = useState({});
	const [apiErrors, setApiErrors] = useState(null);
	const navigate = useNavigate();

	const handleData = e => {
		const { name, value } = e.target;
		setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
		setApiErrors(null);
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
			setErrors({ password: 'Password is required.' });
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

				navigate('/redirect');
			} catch (error) {
				if (error.response) {
					console.error(
						'Server responded with an error:',
						error.response.data,
					);
					console.error('Status code:', error.response.status);

					setApiErrors(
						'Error logging in. Please check your credentials.',
					);
				} else if (error.request) {
					console.error('No response received from the server');

					setApiErrors(
						'No response received from the server. Please try again later.',
					);
				} else {
					console.error(
						'Error setting up the request:',
						error.message,
					);

					setApiErrors(
						'An unexpected error occurred. Please try again later.',
					);
				}
			}
		}
	};

	return (
		<div className={styles.loginPage}>
			<Link to={'/'}>
				<img
					src={CloseIcon}
					alt='Close-icon'
					className={styles.closeIcon}
				/>
			</Link>

			<form className={styles.form}>
				<div className={styles.title}>
					<img src={myDashboardIcon} alt='MyDashboard-icon' />
					<h1>Login to MyDashboard</h1>
				</div>

				{showUsernameInput ? (
					<Fragment>
						<div className={styles.userLogin}>
							<span className={styles.input}>
								<input
									type='text'
									autoComplete='off'
									placeholder='username'
									name='username'
									value={user.username}
									onChange={handleData}
								/>
								<button
									className={styles.nextIcon}
									onClick={handleNextButton}>
									<img src={NextIcon} alt='Next-icon' />
								</button>
							</span>
						<p>or sign in with</p>	
						</div>

						<div className={styles.externalAuth}>
							<GoogleAuth/>
							<GithubAuth/>
							<FacebookAuth/>
						</div>
					</Fragment>
				) : (
					<Fragment>
						<div className={styles.userLogin}>
							<span className={styles.input}>
								<input
									type='password'
									autoComplete='off'
									placeholder='password'
									name='password'
									value={user.password}
									onChange={handleData}
								/>
								<button
									className={styles.nextIcon}
									onClick={saveData}>
									<img src={NextIcon} alt='Next-icon' />
								</button>
							</span>
						<p>or sign in with</p>
						</div>

						<div className={styles.externalAuth}>
							<GoogleAuth/>
							<GithubAuth/>
							<FacebookAuth/>
						</div>
					</Fragment>
				)}
			</form>

            {errors.username && (
                <p className={styles.error}>
                    <img src={ErrorIcon} alt="Error-icon" />
                    {errors.username}
                </p>
            )};

            {errors.password && (
                <p className={styles.error}>
                    <img src={ErrorIcon} alt="Error-icon" />
                    {errors.password}
                </p>
            )};

            {apiErrors && (
                <p className={styles.error}>
                    <img src={ErrorIcon} alt="Error-icon" />
                    {apiErrors}
                </p>
            )}

			<div className={styles.signin}>
				<span />
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
