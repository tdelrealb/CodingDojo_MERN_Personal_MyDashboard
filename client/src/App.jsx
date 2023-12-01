import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';
import './styles/App.css';
import { Routes, Route } from 'react-router-dom';

export const App = () => {
	return (
		<div className='app'>
			<Routes>
				<Route exact path='/' Component={Home} />
				<Route exact path='/login' Component={Login} />
				<Route exact path='/signup' Component={SignUp} />
			</Routes>
		</div>
	);
};
