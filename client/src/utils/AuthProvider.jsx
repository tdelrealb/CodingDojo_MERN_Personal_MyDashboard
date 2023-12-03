import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const token = sessionStorage.getItem('token');

	if (token === null || !token) {
		return <Navigate to={'/login'} />;
	} else {
		return children;
	}
};

AuthProvider.PropTypes = {
	children: PropTypes.node.isRequired,
};
