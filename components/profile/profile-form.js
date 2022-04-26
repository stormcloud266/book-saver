import { useRef } from 'react'
import classes from './profile-form.module.css'

function ProfileForm({ onChangePassword }) {
	const oldPasswordRef = useRef()
	const newPasswordRef = useRef()

	function submitHandler(event) {
		event.preventDefault()

		const oldPassword = oldPasswordRef.current.value
		const newPassword = newPasswordRef.current.value

		onChangePassword({ oldPassword, newPassword })
	}

	return (
		<section className={classes.container}>
			<h2>Change Password</h2>
			<form className={classes.form} onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='new-password'>New Password</label>
					<input
						className={classes.input}
						type='password'
						id='new-password'
						ref={newPasswordRef}
					/>
				</div>
				<div className={classes.control}>
					<label htmlFor='old-password'>Old Password</label>
					<input
						className={classes.input}
						type='password'
						id='old-password'
						ref={oldPasswordRef}
					/>
				</div>
				<div className={classes.action}>
					<button className='button'>Change Password</button>
				</div>
			</form>
		</section>
	)
}

export default ProfileForm
