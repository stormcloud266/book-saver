import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../../lib/db'

async function handler(req, res) {
	if (req.method === 'GET') {
		const session = await getSession({ req })

		if (!session) {
			res.status(401).json({ message: 'Not authenticated' })
			return
		}

		const userEmail = session.user.email
		const client = await connectToDatabase()
		const users = client.db().collection('users')
		const user = await users.findOne({ email: userEmail })

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
		const users = client.db().collection('users')
		const user = await users.findOne({ email: userEmail })

		if (!user) {
			res.status(404).json({ message: 'User not found' })
			client.close()
			return
		}

		if (!user.favorites) {
			const result = await users.updateOne(
				{ email: userEmail },
				{ $push: { favorites: book } }
			)

			res.status(200).json({ message: 'Favorites updated' })
			client.close()
			return
		}

		const isFavorite = user.favorites.find((item) => item.key === book.key)
		console.log('isFavorite: ', isFavorite)

		if (!isFavorite) {
			// add favorite
			const result = await users.updateOne(
				{ email: userEmail },
				{ $push: { favorites: book } }
			)
		} else {
			// remove favorite
			const result = await users.updateOne(
				{ email: userEmail },
				{ $pull: { favorites: book } }
			)
		}

		res.status(200).json({ message: 'Favorites updated' })
		client.close()
		return
	}
}

export default handler
