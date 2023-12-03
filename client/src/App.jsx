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
					<Route exact path='/' Component={Home} />
					<Route exact path='/login' Component={Login} />
					<Route exact path='/signup' Component={SignUp} />
					<Route exact path='/dashboard'/>
					<Route exact path='/work'/>
					<Route exact path='/studies'/>
					<Route exact path='/trip'/>
					<Route exact path='/personal'/>
					<Route exact path='/finance'/>
					<Route exact path='/social'/>
					<Route exact path='/hobbies'/>

				</Routes>
			</BrowserRouter>
		</div>
	);
};
