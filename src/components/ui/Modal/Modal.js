import React from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export const Modal = ({ children, title, isOpen, onClose }) => {
	if (!isOpen) return null;
	return createPortal(
		<div className={styles.modal}>
			<div className={styles.modal__container}>
				<div className={styles.modal__header}>
					<h3 className={styles.modal__header_title}>{title}</h3>
					<div className={styles.modal_close}>
						<button onClick={onClose}>x</button>
					</div>
				</div>
				<div className={styles.modal__body}>{children}</div>
			</div>
		</div>,
		document.body
	);
};
