import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthProvider';

import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';
import { Redirect } from './pages/Redirect/Redirect';

export const App = () => {
	return (
		<div className='app'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />

					<Route
						path='/redirect'
						element={
							<AuthProvider>
								<Redirect />
							</AuthProvider>
						}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
