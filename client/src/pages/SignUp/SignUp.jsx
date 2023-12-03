import styles from './SignUp.module.css';
import backgroundBlur from '../../assets/backgroundBlur.png';
import MyDashboard_Icon from '../../assets/MyDashboard_Icon.png';
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
			paragraph: 'Tell me, what is your first name?',
			type: 'text',
			placeholder: 'first name',
			name: 'firstName',
			value: 'firstName',
		},
		{
			id: 2,
			paragraph: 'Tell me, what is your last name?',
			type: 'text',
			placeholder: 'last name',
			name: 'lastName',
			value: 'lastName',
		},
		{
			id: 3,
			paragraph: 'You need a username. Be creative.',
			type: 'text',
			placeholder: 'username',
			name: 'username',
			value: 'username',
		},
		{
			id: 4,
			paragraph: 'What is your email address?',
			type: 'text',
			placeholder: 'email',
			name: 'email',
			value: 'email',
		},
		{
			id: 5,
			paragraph: 'You need a password. Safety first.',
			type: 'password',
			placeholder: 'password',
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
				navigate('/');
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
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur}
						alt='MyDashboard - Login background'
					/>
				</span>
				<span className={styles.backgroundBlur} />
			</div>

			<Link to={'/login'} className={styles.backBtn}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 32 32'
					fill='none'>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M0 16.0001C0 7.1665 7.16642 7.62939e-05 16 7.62939e-05C24.8336 7.62939e-05 32 7.1665 32 16.0001C32 24.8337 24.8336 32.0001 16 32.0001C7.16642 32.0001 0 24.8337 0 16.0001ZM16 2.46161C8.52589 2.46161 2.46154 8.52597 2.46154 16.0001C2.46154 23.4742 8.52589 29.5385 16 29.5385C23.4741 29.5385 29.5385 23.4742 29.5385 16.0001C29.5385 8.52597 23.4741 2.46161 16 2.46161ZM16.3577 8.97257C16.8402 9.45134 16.8432 10.2306 16.3644 10.7131L12.3397 14.7693H22.6154C23.2951 14.7693 23.8462 15.3203 23.8462 16.0001C23.8462 16.6798 23.2951 17.2308 22.6154 17.2308H12.3397L16.3644 21.287C16.8432 21.7695 16.8402 22.5488 16.3577 23.0276C15.8752 23.5064 15.0959 23.5033 14.6171 23.0208L8.51095 16.867C8.03481 16.3871 8.03481 15.613 8.51095 15.1332L14.6171 8.97934C15.0959 8.49683 15.8752 8.49379 16.3577 8.97257Z'
						fill='white'
						fillOpacity='0.3'
					/>
				</svg>
			</Link>

			<form className={styles.signUpForm}>
				<img
					className={styles.myDashboardIcon}
					src={MyDashboard_Icon}
					alt='MyDashboard - Icon'
				/>
				<h3 className={styles.title}>Welcome to MyDashboard</h3>
				<p className={styles.slogan}>
					Organize your time, achieve your goals.
				</p>

				<div className={styles.formContent}>
					<p>{currentStepData.paragraph}</p>
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
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M0 12C0 5.37481 5.37481 0 12 0C18.6252 0 24 5.37481 24 12C24 18.6252 18.6252 24 12 24C5.37481 24 0 18.6252 0 12ZM12 1.84615C6.39442 1.84615 1.84615 6.39442 1.84615 12C1.84615 17.6056 6.39442 22.1538 12 22.1538C17.6056 22.1538 22.1538 17.6056 22.1538 12C22.1538 6.39442 17.6056 1.84615 12 1.84615ZM11.7318 6.72937C12.0936 6.37029 12.6781 6.37256 13.0372 6.73445L17.6168 11.3498C17.9739 11.7097 17.9739 12.2903 17.6168 12.6502L13.0372 17.2656C12.6781 17.6274 12.0936 17.6297 11.7318 17.2706C11.3699 16.9116 11.3676 16.3271 11.7267 15.9652L14.7452 12.9231H7.03846C6.52866 12.9231 6.11538 12.5098 6.11538 12C6.11538 11.4902 6.52866 11.0769 7.03846 11.0769H14.7452L11.7267 8.03479C11.3676 7.6729 11.3699 7.08845 11.7318 6.72937Z'
										fill='#D9D9D9'
										fillOpacity='0.7'
									/>
								</svg>
							</button>
						) : (
							<button
								className={styles.arrowBtn}
								onClick={saveData}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M0 12C0 5.37481 5.37481 0 12 0C18.6252 0 24 5.37481 24 12C24 18.6252 18.6252 24 12 24C5.37481 24 0 18.6252 0 12ZM12 1.84615C6.39442 1.84615 1.84615 6.39442 1.84615 12C1.84615 17.6056 6.39442 22.1538 12 22.1538C17.6056 22.1538 22.1538 17.6056 22.1538 12C22.1538 6.39442 17.6056 1.84615 12 1.84615ZM11.7318 6.72937C12.0936 6.37029 12.6781 6.37256 13.0372 6.73445L17.6168 11.3498C17.9739 11.7097 17.9739 12.2903 17.6168 12.6502L13.0372 17.2656C12.6781 17.6274 12.0936 17.6297 11.7318 17.2706C11.3699 16.9116 11.3676 16.3271 11.7267 15.9652L14.7452 12.9231H7.03846C6.52866 12.9231 6.11538 12.5098 6.11538 12C6.11538 11.4902 6.52866 11.0769 7.03846 11.0769H14.7452L11.7267 8.03479C11.3676 7.6729 11.3699 7.08845 11.7318 6.72937Z'
										fill='#D9D9D9'
										fillOpacity='0.7'
									/>
								</svg>
							</button>
						)}
					</span>
				</div>

				{apiError && <p className={styles.error}>{apiError}</p>}

				{errors[currentStepData.name] && (
					<p className={styles.error}>
						{errors[currentStepData.name]}
					</p>
				)}
			</form>

			<div className={styles.signUpFooter}>
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
