import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';
import {Dashboard} from './pages/Dashboard/Dashboard';
import {Work} from './pages/Work/Work';
import {Studies} from './pages/Studies/Studies';
import {Trip} from './pages/Trip/Trip';
import {Personal} from './pages/Personal/Personal';
import {Finance} from './pages/Finance/Finance';
import {Social} from './pages/Social/Social';
import {Hobbies} from './pages/Hobbies/Hobbies';

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
					<Route exact path='/dashboard' Component={Dashboard}/>
					<Route exact path='/work' Component={Work}/>
					<Route exact path='/studies' Component={Studies}/>
					<Route exact path='/trip' Component={Trip}/>
					<Route exact path='/personal' Component={Personal}/>
					<Route exact path='/finance' Component={Finance}/>
					<Route exact path='/social' Component={Social}/>
					<Route exact path='/hobbies' Component={Hobbies}/>

				</Routes>
			</BrowserRouter>
		</div>
	);
};
