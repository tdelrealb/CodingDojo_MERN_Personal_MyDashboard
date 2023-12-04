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
								<Dashboard />
							</AuthProvider>
						}></Route>

					<Route
						path='/work'
						element={
							<AuthProvider>
								<SideMenu />
								<Work />
							</AuthProvider>
						}></Route>

					<Route
						path='/studies'
						element={
							<AuthProvider>
								<SideMenu />
								<Studies />
							</AuthProvider>
						}></Route>

					<Route
						path='/trip'
						element={
							<AuthProvider>
								<SideMenu />
								<Trip />
							</AuthProvider>
						}></Route>

					<Route
						path='/personal'
						element={
							<AuthProvider>
								<SideMenu />
								<Personal />
							</AuthProvider>
						}></Route>

					<Route
						path='/finance'
						element={
							<AuthProvider>
								<SideMenu />
								<Finance />
							</AuthProvider>
						}></Route>

					<Route
						path='/social'
						element={
							<AuthProvider>
								<SideMenu />
								<Social />
							</AuthProvider>
						}></Route>

					<Route
						path='/hobbies'
						element={
							<AuthProvider>
								<SideMenu />
								<Hobbies />
							</AuthProvider>
						}></Route>
					
					<Route
						path='/settings'
						element={
							<AuthProvider>
								<SideMenu />
								<Settings />
							</AuthProvider>
						}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
