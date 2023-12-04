import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Work } from './pages/Work/Work';
import { Studies } from './pages/Studies/Studies';
import { Trip } from './pages/Trip/Trip';
import { Personal } from './pages/Personal/Personal';
import { Finance } from './pages/Finance/Finance';
import { Social } from './pages/Social/Social';
import { Hobbies } from './pages/Hobbies/Hobbies';
import { Settings } from './pages/Settings/Settings';
import { AuthProvider } from './utils/AuthProvider';
import { SideMenu } from './components/SideMenu/SideMenu';
import { MyDashboardIcon } from './components/MyDashboardIcon/MyDashboardIcon';

export const App = () => {
	return (
		<div className='app'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />}></Route>
					<Route path='/signup' element={<SignUp />}></Route>

					{/* Private Routes */}
					<Route
						path='/dashboard'
						element={
							<AuthProvider>
								<SideMenu />
								<MyDashboardIcon />
								<Dashboard />
							</AuthProvider>
						}></Route>

					<Route
						path='/work'
						element={
							<AuthProvider>
								<SideMenu />
								<MyDashboardIcon />
								<Work />
							</AuthProvider>
						}></Route>

					<Route
						path='/studies'
						element={
							<AuthProvider>
								<SideMenu />
								<MyDashboardIcon />
								<Studies />
							</AuthProvider>
						}></Route>

					<Route
						path='/trip'
						element={
							<AuthProvider>
								<SideMenu />
								<MyDashboardIcon />
								<Trip />
							</AuthProvider>
						}></Route>

					<Route
						path='/personal'
						element={
							<AuthProvider>
								<SideMenu />
								<MyDashboardIcon />
								<Personal />
							</AuthProvider>
						}></Route>

					<Route
						path='/finance'
						element={
							<AuthProvider>
								<SideMenu />
								<MyDashboardIcon />
								<Finance />
							</AuthProvider>
						}></Route>

					<Route
						path='/social'
						element={
							<AuthProvider>
								<SideMenu />
								<MyDashboardIcon />
								<Social />
							</AuthProvider>
						}></Route>

					<Route
						path='/hobbies'
						element={
							<AuthProvider>
								<SideMenu />
								<MyDashboardIcon />
								<Hobbies />
							</AuthProvider>
						}></Route>
					
					<Route
						path='/settings'
						element={
							<AuthProvider>
								<SideMenu />
								<MyDashboardIcon />
								<Settings />
							</AuthProvider>
						}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
