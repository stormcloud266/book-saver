import { createPortal } from 'react-dom'
import styles from './modal.module.css'

const Modal = ({ isOpen, closeModal, modalImage, children }) => {
	return isOpen
		? createPortal(
				<div className={styles.modal}>
					<div className={styles.inner}>{children}</div>
				</div>,
				document.getElementById('modal')
		  )
		: null
}

export default Modal
