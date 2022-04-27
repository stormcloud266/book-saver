import { useRef, useState } from 'react'
import Modal from '../modal/modal'
import styles from './profile-form.module.css'

const DeleteForm = ({ onDeleteAccount, credentialsAccount }) => {
	const passwordRef = useRef()
	const emailRef = useRef()
	const [modalIsOpen, setModalIsOpen] = useState(false)

	function submitHandler(event) {
		event.preventDefault()
		setModalIsOpen(true)
	}

	function deleteAccount() {
		setModalIsOpen(false)
		const enteredPassword = credentialsAccount
			? passwordRef.current.value
			: null
		const enteredEmail = credentialsAccount ? emailRef.current.value : null
		onDeleteAccount({ enteredPassword, enteredEmail })
	}

	return (
		<>
			<section className={styles.deleteContainer}>
				<h2>Delete Account</h2>
				<form className={styles.form} onSubmit={submitHandler}>
					{credentialsAccount && (
						<>
							<div className={styles.control}>
								<label htmlFor='email'>Email Address</label>
								<input
									className={styles.input}
									type='email'
									id='email'
									ref={emailRef}
								/>
							</div>
							<div className={styles.control}>
								<label htmlFor='Password'>Password</label>
								<input
									className={styles.input}
									type='password'
									id='password'
									ref={passwordRef}
								/>
							</div>
						</>
					)}

					<div className={styles.action}>
						<button className='button warn'>Delete Account</button>
					</div>
				</form>
			</section>
			<Modal isOpen={modalIsOpen}>
				<h2>This action cannot be reversed.</h2>
				<button onClick={deleteAccount} className='button warn'>
					Delete Account
				</button>
				<button onClick={() => setModalIsOpen(false)} className='button'>
					Go Back
				</button>
			</Modal>
		</>
	)
}

export default DeleteForm
