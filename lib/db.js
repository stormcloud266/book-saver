import { MongoClient } from 'mongodb'

const uri = process.env.DB_URI
const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
}

const client = new MongoClient(uri, options)
const clientPromise = client.connect()

async function connectToDatabase() {
	return await client.connect()
}

async function getUsers(clientDB) {
	return await clientDB.db().collection('users')
}

async function addUser(clientDB, userData) {
	const users = await clientDB.db().collection('users')
	return await users.insertOne(userData)
}

async function getUser(clientDB, email) {
	const users = await clientDB.db().collection('users')
	return await users.findOne({ email })
}

async function updateUserPassword(clientDB, email, hashedPassword) {
	const users = await clientDB.db().collection('users')
	return await users.updateOne(
		{ email },
		{ $set: { password: hashedPassword } }
	)
}

async function deleteAccount(clientDB, email, userId, credentialsAccount) {
	const users = await clientDB.db().collection('users')
	await users.deleteOne({ email })

	if (!credentialsAccount) {
		const accounts = await clientDB.db().collection('accounts')
		await accounts.deleteOne({ userId })
	}
}

async function updateUserFavorites(clientDB, email, favorites = [], book) {
	const users = await clientDB.db().collection('users')
	const isFavorite = favorites.find((item) => item.book_id === book.book_id)

	if (!isFavorite) {
		// add favorite
		const result = await users.updateOne(
			{ email },
			{ $push: { favorites: book } }
		)
	} else {
		// remove favorite
		const result = await users.updateOne(
			{ email },
			{ $pull: { favorites: book } }
		)
	}
}

export {
	clientPromise,
	connectToDatabase,
	getUsers,
	getUser,
	addUser,
	updateUserPassword,
	deleteAccount,
	updateUserFavorites,
}
