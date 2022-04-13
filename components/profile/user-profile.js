import { useState } from 'react'
import { signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import ProfileForm from './profile-form'
import DeleteForm from './delete-form'
import classes from './user-profile.module.css'

function UserProfile() {
	const router = useRouter()
	const [deleteError, setDeleteError] = useState(false)
	const [updateError, setUpdateError] = useState(false)

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
			setUpdateError(true)
		}
	}

	async function deleteAccountHandler(accountData) {
		setDeleteError(false)

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
			setDeleteError(true)
		}
	}

	return (
		<section className={classes.profile}>
			<h2 className={classes.title}>Change Password</h2>
			<ProfileForm onChangePassword={changePasswordHandler} />
			{updateError && (
				<h2>
					problem updating password. please check old password and try again.
				</h2>
			)}
			<h2 className={classes.title}>Delete Account</h2>
			<DeleteForm onDeleteAccount={deleteAccountHandler} />
			{deleteError && (
				<h2>
					problem deleting account. please check email and password and try
					again.
				</h2>
			)}
		</section>
	)
}

export default UserProfile
