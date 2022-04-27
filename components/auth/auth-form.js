import { useState, useRef } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useFavorites } from '../../context/favorites-context'
import styles from './auth-form.module.css'

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

const AuthForm = ({ isLogin, providers }) => {
	const emailInputRef = useRef()
	const passwordInputRef = useRef()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const { setUser } = useFavorites()

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
				setUser(result.email)
				router.replace('/account')
			} else {
				setError(true)
				console.log(result.error)
			}
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
		<section className={styles.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>

			<form onSubmit={submitHandler} className={styles.form}>
				<div className={styles.control}>
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' required ref={emailInputRef} />
				</div>
				<div className={styles.control}>
					<label htmlFor='password'>Your Password</label>
					<input
						type='password'
						id='password'
						required
						ref={passwordInputRef}
					/>
				</div>

				<div className={styles.actions}>
					<button className='button'>
						{isLogin ? 'Login' : 'Create Account'}
					</button>

					{Object.values(providers).map((provider) =>
						provider.name !== 'Credentials' ? (
							<div key={provider.name}>
								<button
									className='button secondary'
									onClick={() => signIn(provider.id)}
								>
									Sign in with {provider.name}
								</button>
							</div>
						) : null
					)}

					<Link href={isLogin ? '/signup' : '/login'}>
						<a className={styles.link}>
							{isLogin ? 'Create new account' : 'Login with existing account'}
						</a>
					</Link>
				</div>
			</form>

			{loading && <p className={styles.loading}>loading...</p>}
			{error && <p className={styles.error}>error, please try again</p>}
		</section>
	)
}

export default AuthForm
