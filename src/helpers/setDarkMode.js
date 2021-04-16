import { fetchWithToken } from './fetch';

export const setDarkMode = async (darkMode, id) => {
	if (darkMode != 'true' && darkMode != 'false') {
		return;
	}

	if (darkMode == 'true') {
		darkMode = 1;
	}

	if (darkMode == 'false') {
		darkMode = 0;
	}

	const resp = await fetchWithToken('darkMode', { darkMode, id }, 'POST');
	const body = await resp.json();

	if (body.ok) {
		console.log(body.msg);
	} else {
		console.log(body.msg);
	}
};
