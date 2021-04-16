import React, { useState } from 'react';
import dayjs from 'dayjs';
import styles from './UserTable.module.css';
import { Pencil } from '../ui/Icons/Pencil';
import { Trash } from '../ui/Icons/Trash';
import { useUsers } from '../../hooks/useUsers';
import Swal from 'sweetalert2';
import { SearchUserForm } from '../forms/SearchUserForm';

export const UserTable = ({ users: data, handleOpenUpdateModal, setUsers }) => {
	const [createUser, updateUser, deleteUser, searchUser, getUsers] = useUsers();

	const handleDeleteUser = (id) => {
		Swal.fire({
			title: 'Warning!',
			icon: 'warning',
			text: 'Do you want to delete this user?',
			showCancelButton: true,
			confirmButtonText: `Delete it`,
			cancelButtonText: `Don't deleted it`,
			focusCancel: true,
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				deleteUser(id).then(setUsers);
				Swal.fire('Deleted!', '', 'success');
			} else if (result.isDismissed) {
				Swal.fire('The user was not deleted', '', 'info');
			}
			// const userDeleted = deleteUser(id).then(setUsers);
		});
	};

	return (
		<>
			<SearchUserForm setUsers={setUsers} />
			<table className={styles.table}>
				<thead>
					<tr>
						<th>id</th>
						<th>First name</th>
						<th>Last name</th>
						<th>UserName</th>
						<th>Theme</th>
						<th>Login Authorization</th>
						<th>Created</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{data?.length > 0 &&
						data.map((d) => (
							<tr>
								<td>{d.id}</td>
								<td>{d.firstName}</td>
								<td>{d.lastName}</td>
								<td>{d.userName}</td>
								<td>{d.darkMode == 1 ? 'Dark' : 'Light'}</td>
								<td>{d.canSignIn == 1 ? 'Yes' : 'No'}</td>
								<td>{dayjs(d.created_at).format('DD/MM/YYYY HH:mm:ss')}</td>
								<td className={styles.btns}>
									<button onClick={() => handleOpenUpdateModal(d)}>
										<Pencil width='20px' height='20px' />
									</button>
									<button onClick={() => handleDeleteUser(d.id)}>
										<Trash width='20px' height='20px' />
									</button>
								</td>
							</tr>
						))}
					{data?.length == 0 && (
						<tr>
							<td className={styles.center} colSpan='8'>
								No data
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
};
