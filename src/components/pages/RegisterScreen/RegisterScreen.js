import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from '../../../hooks/useForm';
import styles from './RegisterScreen.module.css';
import { useAuth } from '../../../hooks/useAuth';

export const RegisterScreen = () => {
	const [hasError, setHasError] = useState([]);
	const [user, login, register] = useAuth();

	const [formValues, handleInputChange] = useForm({
		firstName: '',
		lastName: '',
		userName: '',
		password: '',
	});

	const { firstName, lastName, userName, password } = formValues;
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setHasError([]);

		if (firstName.length === 0) {
			setHasError(['The first name field is required']);
		}

		if (lastName.length === 0) {
			setHasError(['The last name field is required']);
		}

		if (userName.length === 0) {
			setHasError(['The username field is required']);
		}

		if (password.length === 0) {
			setHasError(['The password field is required']);
		}

		if (hasError.length > 0) {
			return;
		}

		register(firstName, lastName, userName, password);
	};

	const handleClick = () => {
		history.push('/login');
	};

	useEffect(() => {}, []);

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.card__header}>
					<img src='protected_logo.png' alt='protected.net' />
					<h1>Protected</h1>
				</div>

				{hasError?.length > 0 && (
					<div className={styles.alert__danger}>
						<h4>Error:</h4>
						<ul>
							{hasError.map((e, key) => (
								<li key={key}>{e}</li>
							))}
						</ul>
					</div>
				)}
				<div className={styles.card__body}>
					<form onSubmit={handleSubmit}>
						<label>
							First name
							<input
								type='text'
								placeholder='First name'
								name='firstName'
								value={firstName}
								onChange={handleInputChange}
							/>
						</label>
						<label>
							Last name
							<input
								type='text'
								placeholder='Last name'
								name='lastName'
								value={lastName}
								onChange={handleInputChange}
							/>
						</label>
						<label>
							Username
							<input
								type='text'
								placeholder='Username'
								name='userName'
								value={userName}
								onChange={handleInputChange}
							/>
						</label>
						<label>
							Password
							<input
								type='password'
								placeholder='Password'
								name='password'
								value={password}
								onChange={handleInputChange}
							/>
						</label>
						<div className={styles.card__footer}>
							<button type='submit'>Sign up</button>
						</div>
					</form>
					<span onClick={handleClick} className={styles.span}>
						I have an account already
					</span>
				</div>
			</div>
		</div>
	);
};
