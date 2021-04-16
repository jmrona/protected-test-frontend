import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useUsers } from '../../hooks/useUsers';
import styles from './FormSearch.module.css';

export const SearchUserForm = ({ setUsers }) => {
	const [formValues, handleInputChange, reset] = useForm({ search: '' });

	const [createUser, updateUser, deleteUser, searchUser, getUsers] = useUsers();

	const { search } = formValues;

	const handleSearch = (e) => {
		e.preventDefault();
		search !== ''
			? searchUser(search)
					.then(setUsers)
					.catch((e) => {
						console.log(e);
					})
			: getUsers().then(setUsers);
	};

	return (
		<form onSubmit={handleSearch} className={styles.formSearch}>
			<input
				type='text'
				onChange={handleInputChange}
				name='search'
				placeholder='Search username'
				value={search}
			/>
			<button type='submit'>Search</button>
		</form>
	);
};
