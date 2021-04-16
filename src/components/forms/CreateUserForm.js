import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useUsers } from '../../hooks/useUsers';
import styles from './Forms.module.css';

export const CreateUserForm = ({ closeModal, setUsers }) => {
	const [createUser, updateUser, deleteUser, searchUser] = useUsers();

	const [formValues, handleInputChange, reset] = useForm({
		userName: '',
		password: '',
		firstName: '',
		lastName: '',
		darkMode: '2',
		canSignIn: '2',
	});

	const {
		userName,
		password,
		firstName,
		lastName,
		darkMode,
		canSignIn,
	} = formValues;

	const handleCreateUser = (e) => {
		e.preventDefault();

		const newUsers = createUser(
			userName,
			password,
			firstName,
			lastName,
			darkMode,
			canSignIn
		);

		newUsers.then((res) => {
			setUsers(res);
			closeModal();
		});
	};

	return (
		<div>
			<form onSubmit={handleCreateUser} className={styles.form}>
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
					Password
					<input
						type='password'
						name='password'
						value={password}
						onChange={handleInputChange}
						required
					/>
				</label>
				<label>
					Theme
					<select
						defaultValue={darkMode || '2'}
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
						defaultValue={canSignIn || '2'}
						name='canSignIn'
						onChange={handleInputChange}
						required
					>
						<option value='0'>No</option>
						<option value='1'>Yes</option>
						<option value='2'>Select option</option>
					</select>
				</label>
				<button type='submit' className={styles.green}>
					Create user
				</button>
			</form>
		</div>
	);
};
