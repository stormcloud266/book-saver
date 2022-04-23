import { getSession } from 'next-auth/react'
import UserProfile from '../components/profile/user-profile'

function AccountPage() {
	return <UserProfile />
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req })

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	return {
		props: { session },
	}
}

export default AccountPage
