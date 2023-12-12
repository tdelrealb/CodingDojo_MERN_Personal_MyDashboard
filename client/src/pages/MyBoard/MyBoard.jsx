import styles from './MyBoard.module.css';
import CalendarIcon from '../../assets/calendar-icon.svg';
import AddIconBlue from '../../assets/add-icon-blue.svg';
import AddIconGreen from '../../assets/add-icon-green.svg';
import AddIconAqua from '../../assets/add-icon-aqua.svg';
import AddIconYellow from '../../assets/add-icon-yellow.svg';
import InstagramIcon from '../../assets/instagram-icon.svg';
import FacebookIcon from '../../assets/facebook-icon.svg';
import TwitterIcon from '../../assets/twitter-icon.svg';
import WhatsappIcon from '../../assets/whatsapp-icon.svg';
import DummyUser from '../../assets/dummy-user.png';

import { Clock } from '../../components/Clock/Clock';
import { Link } from 'react-router-dom';

export const MyBoard = () => {
	return (
		<div className={styles.myBoardPage}>
			<div className={styles.leftColumn}>
				<section className={styles.header}>
					<span className={styles.dateNow}>
						<img src={CalendarIcon} alt='Calendar-Icon' />
						<Clock className={styles.clock} />
					</span>

					<span className={styles.userInfo}>
						<h1>
							Hi, <span>user name</span> 👋
						</h1>
						<h6>It is the perfect day for planning.</h6>
					</span>
				</section>

				<section className={styles.newSection}>
					<div className={styles.newCard}>
						<h4>New task</h4>
						<button className={styles.addTaskBtn}>
							<img src={AddIconBlue} alt='AddIcon-blue' />
							<p>Create task</p>
						</button>
					</div>

					<div className={styles.newCard}>
						<h4>New project</h4>
						<button className={styles.addProjectBtn}>
							<img src={AddIconGreen} alt='AddIcon-green' />
							<p>Create project</p>
						</button>
					</div>

					<div className={styles.newCard}>
						<h4>New note</h4>
						<button className={styles.addNoteBtn}>
							<img src={AddIconAqua} alt='AddIcon-aqua' />
							<p>Create note</p>
						</button>
					</div>

					<div className={styles.newCard}>
						<h4>New expense</h4>
						<button className={styles.addExpenseBtn}>
							<img src={AddIconYellow} alt='AddIcon-yellow' />
							<p>Create expense</p>
						</button>
					</div>
				</section>
			</div>
			<div className={styles.rightColumn}>
				<section className={styles.userHub}>
					<div className={styles.social}>
						<a href='https://www.instagram.com/' target='blank'>
							<img src={InstagramIcon} alt='Instagram-icon' />
						</a>

						<a href='https://www.facebook.com/' target='blank'>
							<img src={FacebookIcon} alt='Facebook-icon' />
						</a>

						<a href='https://twitter.com/' target='blank'>
							<img src={TwitterIcon} alt='Twitter-icon' />
						</a>

						<a href='https://web.whatsapp.com/' target='blank'>
							<img src={WhatsappIcon} alt='Whatsapp-icon' />
						</a>
					</div>

					<div className={styles.userData}>
						<span className={styles.userContact}>
							<Link className={styles.link}>
								<h4>User first name and last name</h4>
							</Link>
							<p>user@gmail.com</p>
						</span>
						<img src={DummyUser} alt='User-profile-pic' />
					</div>
				</section>
			</div>
		</div>
	);
};
