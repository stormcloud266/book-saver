import { useRef } from 'react'
import styles from './profile-form.module.css'

const ProfileForm = ({ onChangePassword }) => {
	const oldPasswordRef = useRef()
	const newPasswordRef = useRef()

	function submitHandler(event) {
		event.preventDefault()

		const oldPassword = oldPasswordRef.current.value
		const newPassword = newPasswordRef.current.value

		onChangePassword({ oldPassword, newPassword })
	}

	return (
		<section className={styles.container}>
			<h2>Change Password</h2>
			<form className={styles.form} onSubmit={submitHandler}>
				<div className={styles.control}>
					<label htmlFor='old-password'>Old Password</label>
					<input
						className={styles.input}
						type='password'
						id='old-password'
						ref={oldPasswordRef}
					/>
				</div>
				<div className={styles.control}>
					<label htmlFor='new-password'>New Password</label>
					<input
						className={styles.input}
						type='password'
						id='new-password'
						ref={newPasswordRef}
					/>
				</div>
				<div className={styles.action}>
					<button className='button'>Change Password</button>
				</div>
			</form>
		</section>
	)
}

export default ProfileForm
