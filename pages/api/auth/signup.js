import { hashPassword } from '../../../lib/auth'
import { connectToDatabase, getUser, addUser } from '../../../lib/db'

async function handler(req, res) {
	// exits if request isn't a POST request
	if (req.method !== 'POST') {
		return
	}

	// get email and password from the request
	const { email, password } = req.body

	// sends error status if email or password aren't valid
	if (
		!email ||
		!email.includes('@') ||
		!password ||
		password.trim().length < 7
	) {
		res.status(422).json({
			message:
				'Please enter valid email and password with at least 7 characters',
			success: false,
		})
		return
	}

	// connect to mongodb and tries to find existing email
	const client = await connectToDatabase()
	const existingUser = await getUser(client, email)

	// sends error status if trying to sign up with an existing email
	if (existingUser) {
		res.status(422).json({
			message: 'Email already in use',
			success: false,
		})
		client.close()
		return
	}

	// hashes supplied password
	const hashedPassword = await hashPassword(password)

	// adds email and password to database
	const result = await addUser(client, {
		email,
		password: hashedPassword,
		credentialsAccount: true,
	})

	// sends success status and closes db connection after adding user
	res.status(201).json({ message: 'Signed up successfully!', success: true })
	client.close()
	return { email }
}

export default handler
