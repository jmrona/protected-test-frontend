import React, { useEffect, useState } from 'react';
import { setDarkMode } from '../../../../helpers/setDarkMode';
import { useAuth } from '../../../../hooks/useAuth';
import { Moon } from '../../Icons/Moon';
import { Sun } from '../../Icons/Sun';
import styles from './Header.module.css';

export const Header = () => {
	const [user, login, register, logout] = useAuth();
	const [darkModeButton, setDarkModeButton] = useState(
		localStorage.getItem('darkMode')
	);

	const { id, userName } = user;
	// DarkMode
	let darkMode = localStorage.getItem('darkMode');

	const enableDarkMode = () => {
		document.documentElement.setAttribute('theme', 'dark');
		localStorage.setItem('darkMode', 'true');
		setDarkModeButton('true');
	};

	const disableDarkMode = () => {
		document.documentElement.setAttribute('theme', 'light');
		localStorage.setItem('darkMode', 'false');
		setDarkModeButton('false');
	};

	const handleChangeDarkMode = async () => {
		darkMode = localStorage.getItem('darkMode');
		darkMode == 'false' ? enableDarkMode() : disableDarkMode();
		setDarkMode(localStorage.getItem('darkMode'), id);
	};
	// End darkMode

	return (
		<div className={styles.header}>
			<div>
				<h4>Hi, {userName}!</h4>
			</div>
			<div className={styles.headerBtn}>
				<div className={styles.switch} onClick={handleChangeDarkMode}>
					{darkModeButton == 'true' ? (
						<Sun width='20px' height='20px' />
					) : (
						<Moon width='20px' height='20px' />
					)}
				</div>
				<button onClick={() => logout()}>Logout</button>
			</div>
		</div>
	);
};
