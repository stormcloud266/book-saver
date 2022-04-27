import { getSession } from 'next-auth/react'
import {
	connectToDatabase,
	getUser,
	updateUserFavorites,
} from '../../../lib/db'

async function handler(req, res) {
	if (req.method === 'GET') {
		const session = await getSession({ req })

		if (!session) {
			res.status(401).json({ message: 'Not authenticated' })
			return
		}

		const userEmail = session.user.email
		const client = await connectToDatabase()
		const user = await getUser(client, userEmail)

		if (!user) {
			res.status(404).json({ message: 'User not found' })
			client.close()
			return
		}

		if (!user.favorites || user.favorites.length === 0) {
			res.status(200).json({ message: 'No favorites found', favorites: null })
			client.close()
			return
		}

		res
			.status(200)
			.json({ message: 'Favorites found!', favorites: user.favorites })
		client.close()
		return
	}

	if (req.method === 'POST') {
		const session = await getSession({ req })

		if (!session) {
			res.status(401).json({ message: 'Not authenticated' })
			return
		}

		const book = req.body.book
		const userEmail = session.user.email

		const client = await connectToDatabase()
		const user = await getUser(client, userEmail)

		if (!user) {
			res.status(404).json({ message: 'User not found' })
			client.close()
			return
		}

		const result = await updateUserFavorites(
			client,
			userEmail,
			user.favorites,
			book
		)
		res.status(200).json({ message: 'Favorites updated' })
		client.close()
		return
	}
}

export default handler
