import { getSession } from 'next-auth/react'
import { connectToDatabase, deleteAccount, getUser } from '../../../lib/db'
import { verifyPassword } from '../../../lib/auth'

async function handler(req, res) {
	if (req.method !== 'DELETE') return

	const session = await getSession({ req })

	if (!session) {
		res.status(401).json({ message: 'Not authenticated' })
		return
	}

	const userEmail = session.user.email
	const enteredPassword = req.body.enteredPassword
	const enteredEmail = req.body.enteredEmail

	if (session.user.credentialsAccount && userEmail !== enteredEmail) {
		res.status(404).json({ message: 'Incorrect email entered.' })
		return
	}

	const client = await connectToDatabase()
	const user = await getUser(client, userEmail)

	if (!user) {
		res.status(404).json({ message: 'User not found' })
		client.close()
		return
	}

	if (user.credentialsAccount) {
		const currentPassword = user.password
		const passwordsAreEqual = await verifyPassword(
			enteredPassword,
			currentPassword
		)
		if (!passwordsAreEqual) {
			res.status(403).json({ message: 'Invalid password' })
			client.close()
			return
		}
	}

	const result = await deleteAccount(
		client,
		userEmail,
		user._id,
		user.credentialsAccount
	)
	client.close()
	res.status(200).json({ message: 'Account deleted', success: true })
}

export default handler
