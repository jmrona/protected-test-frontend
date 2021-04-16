const baseUrl = process.env.REACT_APP_LOCAL_ENDPOINT;

export const fetchWithoutToken = (endpoint, data, method = 'GET') => {
	const url = `${baseUrl}/${endpoint}`; //localhost:8000/api/auth

	if (method === 'GET') {
		return fetch(url, {
			method,
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
	} else {
		return fetch(url, {
			method,
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(data),
		});
	}
};

export const fetchWithToken = (endpoint, data, method = 'GET') => {
	const url = `${baseUrl}/${endpoint}`; //localhost:8000/api/auth
	const token = localStorage.getItem('token-protected') || '';

	if (method === 'GET') {
		return fetch(url, {
			method,
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				// Accept: 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});
	} else {
		return fetch(url, {
			method,
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify(data),
		});
	}
};
