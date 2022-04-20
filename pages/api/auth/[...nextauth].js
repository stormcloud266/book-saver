import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { verifyPassword } from '../../../lib/auth'
import { connectToDatabase } from '../../../lib/db'

export default NextAuth({
	session: {
		jwt: true,
	},
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				// connect to mongodb and users collection, tries to find a user with the supplied email
				const client = await connectToDatabase()
				const usersCollection = client.db().collection('users')
				const user = await usersCollection.findOne({ email: credentials.email })

				// error if there isn't a user with that email
				if (!user) {
					client.close()
					throw new Error('No user found')
				}

				// checks if supplied password can be hashed to match the saved password
				const isValid = await verifyPassword(
					credentials.password,
					user.password
				)

				// error if incorrect password
				if (!isValid) {
					client.close()
					throw new Error('Could not login')
				}

				// if email and password match return email. this will be visible on the front end, so don't return password
				client.close()
				return { email: user.email }
			},
		}),
	],
})
