import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from '../../../hooks/useForm';
import styles from './LoginScreen.module.css';
import { useAuth } from '../../../hooks/useAuth';

export const LoginScreen = () => {
	const [hasError, setHasError] = useState([]);

	const [user, login] = useAuth();

	const [formValues, handleInputChange] = useForm({
		username: '',
		password: '',
	});

	const { username, password } = formValues;
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setHasError([]);

		if (username.length === 0) {
			setHasError(['The username field is required']);
		}

		if (password.length === 0) {
			setHasError(['The password field is required']);
		}

		if (hasError.length > 0) {
			return;
		}

		login(username, password);
	};

	const handleClick = () => {
		history.push('/register');
	};

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
							Username
							<input
								type='text'
								placeholder='Username'
								name='username'
								value={username}
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
							<button type='submit'>Sign in</button>
						</div>
					</form>
					<span onClick={handleClick} className={styles.span}>
						I don't have an account yet
					</span>
				</div>
			</div>
		</div>
	);
};
