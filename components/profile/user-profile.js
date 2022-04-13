import { signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import ProfileForm from './profile-form'
import DeleteForm from './delete-form'
import classes from './user-profile.module.css'

function UserProfile() {
	const router = useRouter()

	async function changePasswordHandler(passwordData) {
		const response = await fetch('/api/user/change-password', {
			method: 'PATCH',
			body: JSON.stringify(passwordData),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const data = await response.json()
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
		}
	}

	return (
		<section className={classes.profile}>
			<h2>Change Password</h2>
			<ProfileForm onChangePassword={changePasswordHandler} />
			<h2>delete account</h2>
			<DeleteForm onDeleteAccount={deleteAccountHandler} />
		</section>
	)
}

export default UserProfile
