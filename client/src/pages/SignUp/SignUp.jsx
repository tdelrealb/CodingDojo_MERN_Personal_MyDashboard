/* eslint-disable react-hooks/exhaustive-deps */
import styles from './SignUp.module.css';
import myDashboardIcon from '../../assets/my-dashboard-icon-gradient.png';
import CloseIcon from '../../assets/close-icon.svg';
import NextIcon from '../../assets/next-icon.svg';
import ErrorIcon from '../../assets/error-icon.svg';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const SignUp = () => {
	const initialValue = {
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
	};

	const steps = [
		{
			id: 1,
			type: 'text',
			placeholder: 'first name',
			name: 'firstName',
			value: 'firstName',
		},

		{
			id: 2,
			type: 'text',
			placeholder: 'last name',
			name: 'lastName',
			value: 'lastName',
		},

		{
			id: 3,
			type: 'text',
			placeholder: 'username',
			name: 'username',
			value: 'username',
		},

		{
			id: 4,
			type: 'text',
			placeholder: 'email',
			name: 'email',
			value: 'email',
		},

		{
			id: 5,
			type: 'password',
			placeholder: 'password',
			name: 'password',
			value: 'password',
		},
	];

	const [currentStep, setCurrentStep] = useState(0);
	const [user, setUser] = useState(initialValue);
	const [errors, setErrors] = useState({});
	const [apiErrors, setApiErrors] = useState(null);
	const [progressBar, setProgressBar] = useState(0);
	const navigate = useNavigate();

	const handleData = e => {
		const { name, value } = e.target;
		setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
		setApiErrors(null);
		setUser({ ...user, [name]: value });
	};

	const handleNextButton = e => {
		e.preventDefault();

		const currentStepData = steps[currentStep];
		if (
			(currentStepData.name === 'firstName' &&
				(!user.firstName || user.firstName.length < 3)) ||
			(currentStepData.name === 'lastName' &&
				(!user.lastName || user.lastName.length < 3)) ||
			(currentStepData.name === 'username' &&
				(!user.username || user.username.length < 6)) ||
			(currentStepData.name === 'email' && !user.email) ||
			(currentStepData.name === 'password' &&
				(!user.password || user.password.length < 8))
		) {
			setErrors({
				[currentStepData.name]: `Validation failed for the given ${currentStepData.placeholder}. Please check the input.`,
			});
			return;
		}

		setErrors({});
		setCurrentStep(prevStep => prevStep + 1);
	};

	const saveData = async e => {
		e.preventDefault();

		if (!user.firstName || user.firstName.length < 3) {
			setErrors({
				firstName:
					'You need to specify your first name and it must be at least three characters long.',
			});
		} else if (!user.lastName || user.lastName.length < 3) {
			setErrors({
				lastName:
					'You need to specify your last name and it must be at least three characters long.',
			});
		} else if (!user.username || user.username.length < 6) {
			setErrors({
				username:
					'You need to specify your username and it must be at least six characters long.',
			});
		} else if (!user.email) {
			setErrors({
				email: 'You need to specify a valid email.',
			});
		} else if (!user.password || user.password.length < 8) {
			setErrors({
				password:
					'You need to specify a valid password and it must be at least eight characters long.',
			});
		} else {
			setErrors({});
			try {
				const newUser = {
					firstName: user.firstName,
					lastName: user.lastName,
					username: user.username,
					email: user.email,
					password: user.password,
				};

				const response = await axios.post(
					`${import.meta.env.VITE_AXIOS_URI}/users/register`,
					newUser,
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

					setApiErrors('Error in user sign in. Please try again.');
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

	const currentStepData = steps[currentStep];

	useEffect(() => {
		const totalSteps = steps.length;
		const currentProgress = (currentStep / totalSteps) * 100;
		setProgressBar(currentProgress);
	}, [currentStep, steps]);

	return (
		<div className={styles.signUpPage}>
			<div className={styles.progressBar}>
				<div
					className={styles.progressBarFill}
					style={{ width: `${progressBar}%` }}
				/>
			</div>

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
					<h1>Register to MyDashboard</h1>
					<h6>Organize your time, achieve your goals.</h6>
				</div>

				<div className={styles.userSignUp}>
					<span className={styles.input}>
						<input
							type={currentStepData.type}
							autoComplete='off'
							placeholder={currentStepData.placeholder}
							name={currentStepData.name}
							value={user[currentStepData.value]}
							onChange={handleData}
						/>

						{currentStep < steps.length - 1 ? (
							<button
								className={styles.nextIcon}
								onClick={handleNextButton}>
								<img src={NextIcon} alt='Next-icon' />
							</button>
						) : (
							<button
								className={styles.nextIcon}
								onClick={saveData}>
								<img src={NextIcon} alt='Next-icon' />
							</button>
						)}
					</span>
				</div>
			</form>

			{apiErrors && (
				<p className={styles.error}>
					<img src={ErrorIcon} alt='Error-icon' />
					{apiErrors}
				</p>
			)}

			{errors[currentStepData.name] && (
				<p className={styles.error}>
					<img src={ErrorIcon} alt='Error-icon' />
					{errors[currentStepData.name]}
				</p>
			)}

			<div className={styles.login}>
				<span />
				<p>
					Already have an account?{' '}
					<Link to={'/login'} className={styles.link}>
						Login.
					</Link>
				</p>
			</div>
		</div>
	);
};
