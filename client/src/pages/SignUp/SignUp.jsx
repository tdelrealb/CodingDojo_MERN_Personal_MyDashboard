import styles from './SignUp.module.css';
import MyDashboardIcon from '../../assets/MyDashboardIcon.png';
import CloseIcon from '../../assets/CloseIcon.svg';
import Error from '../../assets/Error.svg';
import ArrowBtn from '../../assets/ArrowBtn.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
			placeholder: 'tell me your first name',
			name: 'firstName',
			value: 'firstName',
		},
		{
			id: 2,
			type: 'text',
			placeholder: 'tell me your last name',
			name: 'lastName',
			value: 'lastName',
		},
		{
			id: 3,
			type: 'text',
			placeholder: 'create a username',
			name: 'username',
			value: 'username',
		},
		{
			id: 4,
			type: 'text',
			placeholder: 'tell me your email',
			name: 'email',
			value: 'email',
		},
		{
			id: 5,
			type: 'password',
			placeholder: 'create your password',
			name: 'password',
			value: 'password',
		},
	];

	const [currentStep, setCurrentStep] = useState(0);
	const [user, setUser] = useState(initialValue);
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
					'http://localhost:7000/users/register',
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

					setApiError('Error in user sign in. Please try again.');
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

	const currentStepData = steps[currentStep];

	return (
		<div className={styles.signUpPage}>
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
					<h1 className={styles.title}>Register to MyDashboard</h1>
					<h6 className={styles.text}>
						Organize your time, achieve your goals.
					</h6>
				</div>

				<span className={styles.fakeInput}>
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
							className={styles.arrowBtn}
							onClick={handleNextButton}>
							<img src={ArrowBtn} alt='NextStep' />
						</button>
					) : (
						<button className={styles.arrowBtn} onClick={saveData}>
							<img src={ArrowBtn} alt='NextStep' />
						</button>
					)}
				</span>

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

				{errors[currentStepData.name] && (
					<p className={styles.error}>
						<img
							src={Error}
							alt='Error icon'
							className={styles.errorIcon}
						/>
						{errors[currentStepData.name]}
					</p>
				)}
			</form>

			<div className={styles.loginFooter}>
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
