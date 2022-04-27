import { getSession } from 'next-auth/react'
import { connectToDatabase, updateUserPassword, getUser } from '../../../lib/db'
import { verifyPassword, hashPassword } from '../../../lib/auth'

async function handler(req, res) {
	if (req.method !== 'PATCH') return

	const session = await getSession({ req })

	if (!session) {
		res.status(401).json({ message: 'Not authenticated' })
		return
	}

	const userEmail = session.user.email
	const oldPassword = req.body.oldPassword
	const newPassword = req.body.newPassword

	const client = await connectToDatabase()
	const user = await getUser(client, userEmail)

	if (!user) {
		res.status(404).json({ message: 'User not found' })
		client.close()
		return
	}

	const currentPassword = user.password

	const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

	if (!passwordsAreEqual) {
		res.status(403).json({ message: 'Invalid password' })
		client.close()
		return
	}

	const hashedPassword = await hashPassword(newPassword)
	const result = await updateUserPassword(client, userEmail, hashedPassword)

	client.close()
	res.status(200).json({ message: 'Password updated', success: true })
}

export default handler
