import styles from './Login.module.css';
import backgroundBlur from '../../assets/backgroundBlur.png';
import MyDashboard_Icon from '../../assets/MyDashboard_Icon.png';
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
		setUser({ ...user, [name]: value });
	};

	const handleNextButton = e => {
		e.preventDefault();
		if (!user.username) {
			setErrors({ username: 'Username is required' });
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
					'http://localhost:7000/users/login',
					loggedUser,
				);

				const token = response.data.authToken;

				sessionStorage.setItem('token', token);

				navigate('/dashboard');
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
			<div className={styles.background}>
				<span className={styles.imageWrapper}>
					<img
						src={backgroundBlur}
						alt='MyDashboard - Login background'
					/>
				</span>
				<span className={styles.backgroundBlur} />
			</div>

			<Link to={'/'} className={styles.cancelBtn}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 32 32'
					fill='none'>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M0 16C0 7.16642 7.16642 0 16 0C24.8336 0 32 7.16642 32 16C32 24.8336 24.8336 32 16 32C7.16642 32 0 24.8336 0 16ZM16 2.46154C8.52589 2.46154 2.46154 8.52589 2.46154 16C2.46154 23.4741 8.52589 29.5385 16 29.5385C23.4741 29.5385 29.5385 23.4741 29.5385 16C29.5385 8.52589 23.4741 2.46154 16 2.46154Z'
						fill='white'
						fillOpacity='0.3'
					/>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M10.2066 10.2066C10.6873 9.72599 11.4666 9.72599 11.9472 10.2066L21.7934 20.0528C22.274 20.5334 22.274 21.3127 21.7934 21.7934C21.3127 22.274 20.5334 22.274 20.0528 21.7934L10.2066 11.9472C9.72599 11.4666 9.72599 10.6873 10.2066 10.2066Z'
						fill='white'
						fillOpacity='0.3'
					/>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M21.7934 10.2066C22.274 10.6873 22.274 11.4666 21.7934 11.9472L11.9472 21.7934C11.4666 22.274 10.6873 22.274 10.2066 21.7934C9.72599 21.3127 9.72599 20.5334 10.2066 20.0528L20.0528 10.2066C20.5334 9.72599 21.3127 9.72599 21.7934 10.2066Z'
						fill='white'
						fillOpacity='0.3'
					/>
				</svg>
			</Link>

			<form className={styles.loginForm}>
				<img
					className={styles.myDashboardIcon}
					src={MyDashboard_Icon}
					alt='MyDashboard - Icon'
				/>
				<h3 className={styles.title}>Login to MyDashboard</h3>
				<p className={styles.slogan}>Your life, under control.</p>

				<div className={styles.formContent}>
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
						</span>
					)}
				</div>

				{errors.username && (
					<p className={styles.error}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							viewBox='0 0 21 21'
							fill='none'>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M0 10.5C0 4.70296 4.70296 0 10.5 0C16.297 0 21 4.70296 21 10.5C21 16.297 16.297 21 10.5 21C4.70296 21 0 16.297 0 10.5ZM10.5 1.61538C5.59511 1.61538 1.61538 5.59511 1.61538 10.5C1.61538 15.4049 5.59511 19.3846 10.5 19.3846C15.4049 19.3846 19.3846 15.4049 19.3846 10.5C19.3846 5.59511 15.4049 1.61538 10.5 1.61538Z'
								fill='#D9D9D9'
								fillOpacity='0.7'
							/>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M10.4894 4.84871C10.6385 4.8473 10.7863 4.87628 10.9239 4.93391C11.0615 4.99156 11.1859 5.07668 11.2895 5.18404C11.3931 5.29142 11.4737 5.41879 11.5265 5.55837C11.5792 5.69794 11.6029 5.84681 11.5961 5.99588L11.3068 12.1533C11.2866 12.5841 10.9314 12.9231 10.5 12.9231C10.0687 12.9231 9.71348 12.5842 9.6932 12.1534L9.40338 5.99588C9.39669 5.84859 9.41976 5.70146 9.47119 5.56329C9.52262 5.42511 9.60136 5.29872 9.70272 5.19164C9.80408 5.08457 9.92598 4.99903 10.0611 4.9401C10.1962 4.88122 10.3418 4.85014 10.4891 4.84872'
								fill='#D9D9D9'
								fillOpacity='0.7'
							/>
							<path
								d='M10.5 16.1493C10.3003 16.1493 10.1051 16.0901 9.93909 15.9792C9.77306 15.8682 9.64365 15.7105 9.56724 15.526C9.49082 15.3416 9.47083 15.1386 9.50978 14.9427C9.54874 14.7469 9.6449 14.567 9.78609 14.4258C9.92729 14.2846 10.1072 14.1884 10.303 14.1495C10.4989 14.1105 10.7019 14.1305 10.8864 14.2069C11.0708 14.2833 11.2285 14.4127 11.3395 14.5788C11.4504 14.7448 11.5096 14.94 11.5096 15.1397C11.5096 15.4075 11.4032 15.6643 11.2139 15.8536C11.0246 16.0429 10.7678 16.1493 10.5 16.1493Z'
								fill='#D9D9D9'
								fillOpacity='0.7'
							/>
						</svg>
						{errors.username}
					</p>
				)}
				{errors.password && (
					<p className={styles.error}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							viewBox='0 0 21 21'
							fill='none'>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M0 10.5C0 4.70296 4.70296 0 10.5 0C16.297 0 21 4.70296 21 10.5C21 16.297 16.297 21 10.5 21C4.70296 21 0 16.297 0 10.5ZM10.5 1.61538C5.59511 1.61538 1.61538 5.59511 1.61538 10.5C1.61538 15.4049 5.59511 19.3846 10.5 19.3846C15.4049 19.3846 19.3846 15.4049 19.3846 10.5C19.3846 5.59511 15.4049 1.61538 10.5 1.61538Z'
								fill='#D9D9D9'
								fillOpacity='0.7'
							/>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M10.4894 4.84871C10.6385 4.8473 10.7863 4.87628 10.9239 4.93391C11.0615 4.99156 11.1859 5.07668 11.2895 5.18404C11.3931 5.29142 11.4737 5.41879 11.5265 5.55837C11.5792 5.69794 11.6029 5.84681 11.5961 5.99588L11.3068 12.1533C11.2866 12.5841 10.9314 12.9231 10.5 12.9231C10.0687 12.9231 9.71348 12.5842 9.6932 12.1534L9.40338 5.99588C9.39669 5.84859 9.41976 5.70146 9.47119 5.56329C9.52262 5.42511 9.60136 5.29872 9.70272 5.19164C9.80408 5.08457 9.92598 4.99903 10.0611 4.9401C10.1962 4.88122 10.3418 4.85014 10.4891 4.84872'
								fill='#D9D9D9'
								fillOpacity='0.7'
							/>
							<path
								d='M10.5 16.1493C10.3003 16.1493 10.1051 16.0901 9.93909 15.9792C9.77306 15.8682 9.64365 15.7105 9.56724 15.526C9.49082 15.3416 9.47083 15.1386 9.50978 14.9427C9.54874 14.7469 9.6449 14.567 9.78609 14.4258C9.92729 14.2846 10.1072 14.1884 10.303 14.1495C10.4989 14.1105 10.7019 14.1305 10.8864 14.2069C11.0708 14.2833 11.2285 14.4127 11.3395 14.5788C11.4504 14.7448 11.5096 14.94 11.5096 15.1397C11.5096 15.4075 11.4032 15.6643 11.2139 15.8536C11.0246 16.0429 10.7678 16.1493 10.5 16.1493Z'
								fill='#D9D9D9'
								fillOpacity='0.7'
							/>
						</svg>
						{errors.password}
					</p>
				)}

				{apiError && (
					<p className={styles.error}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							viewBox='0 0 21 21'
							fill='none'>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M0 10.5C0 4.70296 4.70296 0 10.5 0C16.297 0 21 4.70296 21 10.5C21 16.297 16.297 21 10.5 21C4.70296 21 0 16.297 0 10.5ZM10.5 1.61538C5.59511 1.61538 1.61538 5.59511 1.61538 10.5C1.61538 15.4049 5.59511 19.3846 10.5 19.3846C15.4049 19.3846 19.3846 15.4049 19.3846 10.5C19.3846 5.59511 15.4049 1.61538 10.5 1.61538Z'
								fill='#D9D9D9'
								fillOpacity='0.7'
							/>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M10.4894 4.84871C10.6385 4.8473 10.7863 4.87628 10.9239 4.93391C11.0615 4.99156 11.1859 5.07668 11.2895 5.18404C11.3931 5.29142 11.4737 5.41879 11.5265 5.55837C11.5792 5.69794 11.6029 5.84681 11.5961 5.99588L11.3068 12.1533C11.2866 12.5841 10.9314 12.9231 10.5 12.9231C10.0687 12.9231 9.71348 12.5842 9.6932 12.1534L9.40338 5.99588C9.39669 5.84859 9.41976 5.70146 9.47119 5.56329C9.52262 5.42511 9.60136 5.29872 9.70272 5.19164C9.80408 5.08457 9.92598 4.99903 10.0611 4.9401C10.1962 4.88122 10.3418 4.85014 10.4891 4.84872'
								fill='#D9D9D9'
								fillOpacity='0.7'
							/>
							<path
								d='M10.5 16.1493C10.3003 16.1493 10.1051 16.0901 9.93909 15.9792C9.77306 15.8682 9.64365 15.7105 9.56724 15.526C9.49082 15.3416 9.47083 15.1386 9.50978 14.9427C9.54874 14.7469 9.6449 14.567 9.78609 14.4258C9.92729 14.2846 10.1072 14.1884 10.303 14.1495C10.4989 14.1105 10.7019 14.1305 10.8864 14.2069C11.0708 14.2833 11.2285 14.4127 11.3395 14.5788C11.4504 14.7448 11.5096 14.94 11.5096 15.1397C11.5096 15.4075 11.4032 15.6643 11.2139 15.8536C11.0246 16.0429 10.7678 16.1493 10.5 16.1493Z'
								fill='#D9D9D9'
								fillOpacity='0.7'
							/>
						</svg>
						{apiError}
					</p>
				)}
			</form>

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
