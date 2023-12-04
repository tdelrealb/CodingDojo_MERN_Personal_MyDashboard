import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home/Home';

export const App = () => {
	return (
		<div className='app'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};
