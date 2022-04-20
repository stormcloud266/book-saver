import { getSession } from 'next-auth/react'
import AuthForm from '../components/auth/auth-form'

function Login() {
	return <AuthForm isLogin />
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req })

	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: { session },
	}
}

export default Login
