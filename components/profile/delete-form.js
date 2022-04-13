import { useRef } from 'react'
import classes from './profile-form.module.css'

function DeleteForm({ onDeleteAccount }) {
	const passwordRef = useRef()
	const emailRef = useRef()

	function submitHandler(event) {
		event.preventDefault()

		const enteredPassword = passwordRef.current.value
		const enteredEmail = emailRef.current.value

		onDeleteAccount({ enteredPassword, enteredEmail })
	}

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor='email'>Email Account</label>
				<input
					className={classes.input}
					type='email'
					id='email'
					ref={emailRef}
				/>
			</div>
			<div className={classes.control}>
				<label htmlFor='Password'>Password</label>
				<input
					className={classes.input}
					type='password'
					id='password'
					ref={passwordRef}
				/>
			</div>
			<div className={classes.action}>
				<button>Delete Account</button>
			</div>
		</form>
	)
}

export default DeleteForm
