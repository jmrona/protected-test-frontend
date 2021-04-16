import React from 'react';
import styles from './PageNotFound.module.css';

export const PageNotFound = () => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1>Page Not Found</h1>
				<p>We couldn't find what you were looking for</p>
			</div>
		</div>
	);
};
