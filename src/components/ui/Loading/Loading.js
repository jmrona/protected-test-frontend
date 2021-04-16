import React from 'react';
import styles from './Loading.module.css';

export const Loading = () => {
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.loadingScreen}>
					<div className={styles.ldsRoller}>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<h2>Loading...</h2>
				</div>
			</div>
		</div>
	);
};
