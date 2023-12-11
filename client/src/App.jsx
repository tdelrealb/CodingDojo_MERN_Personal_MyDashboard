import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';
import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const App = () => {
	return (
		<div className='app'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />}/>
                    <Route path='/login' element={<Login />}/>
					<Route path='/signup' element={<SignUp />}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
