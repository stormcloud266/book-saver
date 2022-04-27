import { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import ProfileForm from './profile-form'
import DeleteForm from './delete-form'
import styles from './user-profile.module.css'

const UserProfile = () => {
	const router = useRouter()
	const { data: session } = useSession()
	const [message, setMessage] = useState(null)

	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				setMessage(null)
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [message])

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
			setMessage(
				'There was a problem updating your password. Please check old password and try again.'
			)
		} else {
			setMessage('Password updated successfully!')
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
			setMessage(
				'There was a problem deleting your account. Please check email and password and try again.'
			)
		}
	}

	return (
		<section className={styles.profile}>
			{session.user.credentialsAccount && (
				<ProfileForm onChangePassword={changePasswordHandler} />
			)}
			<DeleteForm
				onDeleteAccount={deleteAccountHandler}
				credentialsAccount={!!session.user.credentialsAccount}
			/>
			{message && <div className={styles.alert}>{message}</div>}
		</section>
	)
}

export default UserProfile
