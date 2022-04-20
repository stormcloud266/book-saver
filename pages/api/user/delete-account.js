import { getSession } from 'next-auth/react'
import { connectToDatabase } from '../../../lib/db'
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

	if (userEmail !== enteredEmail) {
		res.status(404).json({ message: 'Incorrect email entered.' })
		return
	}

	const client = await connectToDatabase()
	const users = client.db().collection('users')
	const user = await users.findOne({ email: userEmail })

	if (!user) {
		res.status(404).json({ message: 'User not found' })
		client.close()
		return
	}

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

	const result = await users.deleteOne({ email: userEmail })

	client.close()
	res.status(200).json({ message: 'Account deleted', success: true })
}

export default handler
