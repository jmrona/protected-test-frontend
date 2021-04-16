import { cleanup } from '@testing-library/react';
import React, { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';

export const useUsers = (initialState = []) => {
	const getUsers = async () => {
		const resp = await fetchWithToken('home', {}, 'GET');
		const body = await resp.json();

		if (body.ok) {
			return body.users;
		} else {
			Swal.fire({
				title: 'Error!',
				text: body.msg,
				icon: 'error',
			});
		}
	};

	const createUser = async (
		userName,
		password,
		firstName,
		lastName,
		darkMode,
		canSignIn
	) => {
		const resp = await fetchWithToken(
			'home',
			{ userName, password, firstName, lastName, darkMode, canSignIn },
			'POST'
		);
		const body = await resp.json();

		if (body.ok) {
			return body.users;
		} else {
			Swal.fire({
				title: 'Error!',
				text: body.msg,
				icon: 'error',
			});
			return false;
		}
	};

	const updateUser = async (
		id,
		userName,
		password,
		firstName,
		lastName,
		darkMode,
		canSignIn
	) => {
		const resp = await fetchWithToken(
			'home/' + id,
			{ userName, password, firstName, lastName, darkMode, canSignIn },
			'PUT'
		);
		const body = await resp.json();
		if (body.ok) {
			return body.users;
		} else {
			Swal.fire({
				title: 'Error!',
				text: body.msg,
				icon: 'error',
			});
			return false;
		}
	};

	const deleteUser = async (id) => {
		const resp = await fetchWithToken('home/' + id, {}, 'DELETE');
		const body = await resp.json();

		if (body.ok) {
			return body.users;
		} else {
			Swal.fire({
				title: 'Error!',
				text: body.msg,
				icon: 'error',
			});
		}
	};

	const searchUser = async (userName) => {
		const resp = await fetchWithToken('home/search/' + userName, {}, 'GET');
		const body = await resp.json();

		if (body.ok) {
			return body.users;
		} else {
			Swal.fire({
				title: 'Error!',
				text: body.msg,
				icon: 'error',
			});
		}
	};

	return [createUser, updateUser, deleteUser, searchUser, getUsers];
};
