import { getProviders, getSession } from 'next-auth/react'

import AuthForm from '../components/auth/auth-form'

function Login({ session, providers }) {
	return <AuthForm isLogin session={session} providers={providers} />
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

export default Login
