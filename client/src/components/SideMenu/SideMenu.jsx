import styles from './SideMenu.module.css';
import MyDashboardGreen from '../../assets/my-dashboard-icon-secondary-green.svg';
import ArrowIcon from '../../assets/arrow-icon.svg';
import MyDashboardGradient from '../../assets/my-dashboard-icon-gradient.png';
import HomeIconGradient from '../../assets/home-icon.svg';
import HomeIconGrey from '../../assets/home-grey.svg';
import WorkIconGradient from '../../assets/work-gradient.svg';
import WorkIconGrey from '../../assets/work-grey.svg';
import StudiesIconGradient from '../../assets/studies-gradient.svg';
import StudiesIconGrey from '../../assets/studies-grey.svg';
import TripIconGradient from '../../assets/trip-gradient.svg';
import TripIconGrey from '../../assets/trip-grey.svg';
import PersonalIconGradient from '../../assets/personal-gradient.svg';
import PersonalIconGrey from '../../assets/personal-grey.svg';
import FinanceIconGradient from '../../assets/finance-gradient.svg';
import FinanceIconGrey from '../../assets/finance-grey.svg';
import SocialIconGradient from '../../assets/social-gradient.svg';
import SocialIconGrey from '../../assets/social-grey.svg';
import HobbiesIconGradient from '../../assets/hobbies-gradient.svg';
import HobbiesIconGrey from '../../assets/hobbies-grey.svg';
import SettingsIconGradient from '../../assets/settings-gradient.svg';
import SettingsIconGrey from '../../assets/settings-grey.svg';
import LogoutIcon from '../../assets/logout-icon.svg';
import MyDashboardWhite from '../../assets/my-dashboard-icon-white.svg';
import LeftArrowIcon from '../../assets/left-arrow-icon.svg';

import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export const SideMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const isActive = path => {
		return location.pathname === path;
	};

	const handleLogout = () => {
		sessionStorage.removeItem('token');
		navigate('/');
	};

	return (
		<div className={styles.sideMenu}>
			{!isOpen && (
				<span className={styles.sideBtn} onMouseEnter={toggleMenu}>
					<img src={MyDashboardGreen} alt='myDashboard-Green' />
					<img src={ArrowIcon} alt='Arrow-icon' />
				</span>
			)}

			{isOpen && (
				<div
					className={
						isOpen
							? styles.sideMenuContainerOpen
							: styles.sideMenuContainerClosed
					}
					onMouseLeave={toggleMenu}>
					<span className={styles.sideBtnOpen}>
						<img src={LeftArrowIcon} alt='Arrow-icon' />
						<img src={MyDashboardWhite} alt='myDashboard-Green' />
					</span>

					<div className={styles.title}>
						<img src={MyDashboardGradient} alt='MyDashboard-icon' />
						<h3>MyDashboard</h3>
					</div>

					<div className={styles.menuLinks}>
						<Link to={'/myboard'} className={styles.Link}>
							<span className={styles.link}>
								<img
									src={
										isActive('/myboard')
											? HomeIconGradient
											: HomeIconGrey
									}
									alt='Home-icon'
								/>
								<h5
									className={
										isActive('/myboard')
											? styles.titleGradient
											: styles.titleGrey
									}>
									Home
								</h5>
							</span>
						</Link>

						<Link to={'/work'} className={styles.Link}>
							<span className={styles.link}>
								<img
									src={
										isActive('/work')
											? WorkIconGradient
											: WorkIconGrey
									}
									alt='Work-icon'
								/>
								<h5
									className={
										isActive('/work')
											? styles.titleGradient
											: styles.titleGrey
									}>
									Work
								</h5>
							</span>
						</Link>

						<Link to={'/studies'} className={styles.Link}>
							<span className={styles.link}>
								<img
									src={
										isActive('/studies')
											? StudiesIconGradient
											: StudiesIconGrey
									}
									alt='Studies-icon'
								/>
								<h5
									className={
										isActive('/studies')
											? styles.titleGradient
											: styles.titleGrey
									}>
									Studies
								</h5>
							</span>
						</Link>

						<Link to={'/trip'} className={styles.Link}>
							<span className={styles.link}>
								<img
									src={
										isActive('/trip')
											? TripIconGradient
											: TripIconGrey
									}
									alt='Trip-icon'
								/>
								<h5
									className={
										isActive('/trip')
											? styles.titleGradient
											: styles.titleGrey
									}>
									Trip
								</h5>
							</span>
						</Link>

						<Link to={'/personal'} className={styles.Link}>
							<span className={styles.link}>
								<img
									src={
										isActive('/personal')
											? PersonalIconGradient
											: PersonalIconGrey
									}
									alt='Personal-icon'
								/>
								<h5
									className={
										isActive('/personal')
											? styles.titleGradient
											: styles.titleGrey
									}>
									Personal
								</h5>
							</span>
						</Link>

						<Link to={'/finance'} className={styles.Link}>
							<span className={styles.link}>
								<img
									src={
										isActive('/finance')
											? FinanceIconGradient
											: FinanceIconGrey
									}
									alt='Finance-icon'
								/>
								<h5
									className={
										isActive('/finance')
											? styles.titleGradient
											: styles.titleGrey
									}>
									Finance
								</h5>
							</span>
						</Link>

						<Link to={'/social'} className={styles.Link}>
							<span className={styles.link}>
								<img
									src={
										isActive('/social')
											? SocialIconGradient
											: SocialIconGrey
									}
									alt='Social-icon'
								/>
								<h5
									className={
										isActive('/social')
											? styles.titleGradient
											: styles.titleGrey
									}>
									Social
								</h5>
							</span>
						</Link>

						<Link to={'/hobbies'} className={styles.Link}>
							<span className={styles.link}>
								<img
									src={
										isActive('/hobbies')
											? HobbiesIconGradient
											: HobbiesIconGrey
									}
									alt='Hobbies-icon'
								/>
								<h5
									className={
										isActive('/hobbies')
											? styles.titleGradient
											: styles.titleGrey
									}>
									Hobbies
								</h5>
							</span>
						</Link>

						<div className={styles.config}>
							<Link to={'/settings'} className={styles.Link}>
								<span className={styles.link}>
									<img
										src={
											isActive('/settings')
												? SettingsIconGradient
												: SettingsIconGrey
										}
										alt='Settings-icon'
									/>
									<h5
										className={
											isActive('/settings')
												? styles.titleGradient
												: styles.titleGrey
										}>
										Settings
									</h5>
								</span>
							</Link>

							<span
								className={styles.link}
								onClick={handleLogout}>
								<img src={LogoutIcon} alt='Logout-icon' />
								<h5 className={styles.titleGrey}>Logout</h5>
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
