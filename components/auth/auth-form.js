import { useState, useRef } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import classes from './auth-form.module.css'

async function createUser(email, password) {
	const response = await fetch('/api/auth/signup', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong')
	}

	return data
}

function AuthForm({ isLogin }) {
	const emailInputRef = useRef()
	const passwordInputRef = useRef()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	async function submitHandler(event) {
		event.preventDefault()
		setLoading(true)
		setError(false)
		const enteredEmail = emailInputRef.current.value
		const enteredPassword = passwordInputRef.current.value

		if (isLogin) {
			const result = await signIn('credentials', {
				redirect: false,
				email: enteredEmail,
				password: enteredPassword,
			})

			setLoading(false)

			if (!result.error) {
				router.replace('/account')
				return
			}

			setError(true)
		} else {
			try {
				const result = await createUser(enteredEmail, enteredPassword)
				if (result.success) {
					const result = await signIn('credentials', {
						redirect: false,
						email: enteredEmail,
						password: enteredPassword,
					})
					if (!result.error) {
						router.replace('/account')
					}
				} else {
					throw new Error('Could not create account')
				}
			} catch (error) {
				setLoading(false)
				setError(true)
			}
		}
	}

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' required ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='password'>Your Password</label>
					<input
						type='password'
						id='password'
						required
						ref={passwordInputRef}
					/>
				</div>
				<div className={classes.actions}>
					<button>{isLogin ? 'Login' : 'Create Account'}</button>
					<Link
						href={isLogin ? '/signup' : '/login'}
						className={classes.toggle}
					>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</Link>
				</div>
			</form>
			{loading && <h2>loading...</h2>}
			{error && <h2>error, please try again</h2>}
		</section>
	)
}

export default AuthForm
