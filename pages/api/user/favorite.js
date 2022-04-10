import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../../lib/db'

async function handler(req, res) {
	if (req.method !== 'POST') return

	const session = await getSession({ req })

	if (!session) {
		res.status(401).json({ message: 'Not authenticated' })
		return
	}

	const bookID = req.body.bookID
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
			{ $push: { favorites: bookID } }
		)

		res.status(200).json({ message: 'Favorites updated' })
		client.close()
		return
	}

	const isFavorite = user.favorites.find((item) => item === bookID)
	console.log('isFavorite: ', isFavorite)

	if (!isFavorite) {
		// add favorite
		const result = await users.updateOne(
			{ email: userEmail },
			{ $push: { favorites: bookID } }
		)
	} else {
		// remove favorite
		const result = await users.updateOne(
			{ email: userEmail },
			{ $pull: { favorites: bookID } }
		)
	}

	res.status(200).json({ message: 'Favorites updated' })
	client.close()
	return
}

export default handler
