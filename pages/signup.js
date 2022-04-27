import { getProviders, getSession } from 'next-auth/react'
import AuthForm from '../components/auth/auth-form'

const Signup = ({ session, providers }) => {
	return <AuthForm session={session} providers={providers} />
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req })
	const providers = await getProviders()

	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: { session, providers },
	}
}

export default Signup
