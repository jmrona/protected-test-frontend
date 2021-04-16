import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import Swal from 'sweetalert2';

export const useAuth = (initialState = []) => {
	const [user, setUser] = useState([]);
	const history = useHistory();
	const token = localStorage.getItem('token-protected');

	useEffect(() => {
		return getUser();
	}, [user]);

	const login = async (userName, password) => {
		const resp = await fetchWithoutToken(
			'login',
			{ userName, password },
			'POST'
		);
		const body = await resp.json();

		if (body.ok) {
			localStorage.setItem('token-protected', body.token);
			localStorage.setItem('darkMode', body.user.darkMode);
			setUser(body.user);

			history.go('/');
		} else {
			Swal.fire({
				title: 'Error!',
				text: body.msg,
				icon: 'error',
			});
		}
	};

	const register = async (firstName, lastName, userName, password) => {
		const resp = await fetchWithoutToken(
			'register',
			{ firstName, lastName, userName, password },
			'POST'
		);
		const body = await resp.json();

		if (body.ok) {
			login(userName, password);
		} else {
			Swal.fire({
				title: 'Error!',
				text: body.msg,
				icon: 'error',
			});
		}
	};

	const logout = async () => {
		const resp = await fetchWithToken('logout', {}, 'GET');
		const body = await resp.json();

		if (body.ok) {
			localStorage.removeItem('token-protected');
			localStorage.removeItem('darkMode');
			history.go('/login');
		} else {
			Swal.fire({
				title: 'Error!',
				text: body.msg,
				icon: 'error',
			});
		}
	};

	const getUser = async () => {
		if (user.length === 0 && token) {
			const resp = await fetchWithToken('getUser', {}, 'GET');
			const body = await resp.json();

			if (body.ok) {
				setUser(body.user);
			} else {
				Swal.fire({
					title: 'Error!',
					text: body.msg,
					icon: 'error',
				});
			}
		}
	};

	return [user, login, register, logout];
};
