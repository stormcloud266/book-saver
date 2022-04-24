import { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import ProfileForm from './profile-form'
import DeleteForm from './delete-form'
import classes from './user-profile.module.css'

function UserProfile() {
	const router = useRouter()
	const { data: session } = useSession()
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		if (errorMessage) {
			const timer = setTimeout(() => {
				setErrorMessage(null)
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [errorMessage])

	async function changePasswordHandler(passwordData) {
		const response = await fetch('/api/user/change-password', {
			method: 'PATCH',
			body: JSON.stringify(passwordData),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const data = await response.json()

		if (!data.success) {
			setErrorMessage(
				'There was a problem updating your password. Please check old password and try again.'
			)
		}
	}

	async function deleteAccountHandler(accountData) {
		const response = await fetch('/api/user/delete-account', {
			method: 'DELETE',
			body: JSON.stringify(accountData),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const data = await response.json()

		if (data.success) {
			signOut()
			router.replace('/')
		} else {
			setErrorMessage(
				'There was a problem deleting your account. Please check email and password and try again.'
			)
		}
	}

	return (
		<section className={classes.profile}>
			{session.user.credentialsAccount && (
				<>
					<h2 className={classes.title}>Change Password</h2>
					<ProfileForm onChangePassword={changePasswordHandler} />
				</>
			)}
			<h2 className={classes.title}>Delete Account</h2>
			<DeleteForm
				onDeleteAccount={deleteAccountHandler}
				credentialsAccount={!!session.user.credentialsAccount}
			/>
			{errorMessage && <div className={classes.alert}>{errorMessage}</div>}
		</section>
	)
}

export default UserProfile
