import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthProvider';
import { Redirect } from './pages/Redirect/Redirect';

import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';
import { MyBoard } from './pages/MyBoard/MyBoard';
import { SideMenu } from './components/SideMenu/SideMenu';
import { Work } from './pages/Work/Work';
import { Studies } from './pages/Studies/Studies';
import { Trip } from './pages/Trip/Trip';
import { Personal } from './pages/Personal/Personal';
import { Finance } from './pages/Finance/Finance';
import { Social } from './pages/Social/Social';
import { Hobbies } from './pages/Hobbies/Hobbies';
import { Settings } from './pages/Settings/Settings';

export const App = () => {
	return (
		<div className='app'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />

					{/* PrivateRoutes */}
					<Route
						path='/redirect'
						element={
							<AuthProvider>
								<Redirect />
							</AuthProvider>
						}
					/>
					
					<Route
						path='/myboard'
						element={
							<AuthProvider>
								<SideMenu />
								<MyBoard />
							</AuthProvider>
						}
					/>
					
					<Route
						path='/work'
						element={
							<AuthProvider>
								<SideMenu />
								<Work />
							</AuthProvider>
						}
					/>
					
					<Route
						path='/studies'
						element={
							<AuthProvider>
								<SideMenu />
								<Studies />
							</AuthProvider>
						}
					/>
					
					<Route
						path='/trip'
						element={
							<AuthProvider>
								<SideMenu />
								<Trip />
							</AuthProvider>
						}
					/>
					
					<Route
						path='/personal'
						element={
							<AuthProvider>
								<SideMenu />
								<Personal />
							</AuthProvider>
						}
					/>
					
					<Route
						path='/finance'
						element={
							<AuthProvider>
								<SideMenu />
								<Finance />
							</AuthProvider>
						}
					/>
					
					<Route
						path='/social'
						element={
							<AuthProvider>
								<SideMenu />
								<Social />
							</AuthProvider>
						}
					/>
					
					<Route
						path='/hobbies'
						element={
							<AuthProvider>
								<SideMenu />
								<Hobbies />
							</AuthProvider>
						}
					/>
					
					<Route
						path='/settings'
						element={
							<AuthProvider>
								<SideMenu />
								<Settings />
							</AuthProvider>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
