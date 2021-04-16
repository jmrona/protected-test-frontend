import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useUsers } from '../../hooks/useUsers';
import styles from './Forms.module.css';

export const UpdateUserForm = ({ user, closeModal, setUsers }) => {
	const [createUser, updateUser, deleteUser, searchUser] = useUsers();

	const [formValues, handleInputChange, reset] = useForm({
		userName: user.userName || '',
		password: '',
		firstName: user.firstName || '',
		lastName: user.lastName || '',
		darkMode: user.darkMode.toString() || '2',
		canSignIn: user.canSignIn.toString() || '2',
	});
	const {
		userName,
		password,
		firstName,
		lastName,
		darkMode,
		canSignIn,
	} = formValues;

	const handleUpdateUser = (e) => {
		e.preventDefault();

		const userEdited = updateUser(
			user.id,
			userName,
			password,
			firstName,
			lastName,
			darkMode,
			canSignIn
		);

		userEdited.then((res) => {
			setUsers(res);
			closeModal();
		});
	};

	return (
		<div>
			<form onSubmit={handleUpdateUser} className={styles.form}>
				<label>
					First name
					<input
						type='text'
						name='firstName'
						value={firstName}
						onChange={handleInputChange}
						required
					/>
				</label>
				<label>
					Last name
					<input
						type='text'
						name='lastName'
						value={lastName}
						onChange={handleInputChange}
						required
					/>
				</label>
				<label>
					User name
					<input
						type='text'
						name='userName'
						value={userName}
						onChange={handleInputChange}
						required
					/>
				</label>
				<label>
					Password <small>(Leave empty to NOT change the password)</small>
					<input
						type='password'
						name='password'
						value={password}
						onChange={handleInputChange}
					/>
				</label>
				<label>
					Theme
					<select
						defaultValue={+darkMode}
						name='darkMode'
						onChange={handleInputChange}
						required
					>
						<option value='0'>Light</option>
						<option value='1'>Dark</option>
						<option value='2'>Select option</option>
					</select>
				</label>
				<label>
					Login Authorization
					<select
						defaultValue={+canSignIn}
						name='canSignIn'
						onChange={handleInputChange}
						required
					>
						<option value='0'>No</option>
						<option value='1'>Yes</option>
						<option value='2'>Select option</option>
					</select>
				</label>
				<button type='submit' className={styles.orange}>
					Edit user
				</button>
			</form>
		</div>
	);
};
