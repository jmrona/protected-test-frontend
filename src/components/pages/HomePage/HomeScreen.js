import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useUsers } from '../../../hooks/useUsers';
import { Header } from '../../ui/layout/Header/Header';
import styles from './HomeScreen.module.css';
import { Pencil } from '../../ui/Icons/Pencil';
import { Trash } from '../../ui/Icons/Trash';
import { Modal } from '../../ui/Modal/Modal';
import { CreateUserForm } from '../../forms/CreateUserForm';
import { UpdateUserForm } from '../../forms/UpdateUserForm';
import { UserTable } from '../../table/UserTable';

export const HomeScreen = () => {
	const [createUser, updateUser, deleteUser, searchUser, getUsers] = useUsers();
	const [userEdit, setUserEdit] = useState({});
	const [users, setUsers] = useState();
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [openUpdateModal, setOpenUpdateModal] = useState(false);

	useEffect(() => {
		getUsers().then((res) => {
			return setUsers(res);
		});
	}, []);

	const handleOpenCreateModal = () => {
		setOpenCreateModal(true);
	};
	const handleOpenUpdateModal = (user) => {
		setUserEdit(user);
		setOpenUpdateModal(true);
	};

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.content}>
				<UserTable
					users={users}
					handleOpenUpdateModal={handleOpenUpdateModal}
					setUsers={setUsers}
				/>
				<div className={styles.row}>
					<button onClick={handleOpenCreateModal}>
						<span>+</span> Add new user
					</button>
				</div>
			</div>
			<Modal
				title='Add new user'
				isOpen={openCreateModal}
				onClose={() => setOpenCreateModal(false)}
			>
				<CreateUserForm
					closeModal={() => setOpenCreateModal(false)}
					setUsers={setUsers}
				/>
			</Modal>
			<Modal
				title='Edit user'
				isOpen={openUpdateModal}
				onClose={() => setOpenUpdateModal(false)}
			>
				<UpdateUserForm
					closeModal={() => setOpenUpdateModal(false)}
					user={userEdit}
					setUsers={setUsers}
				/>
			</Modal>
		</div>
	);
};
