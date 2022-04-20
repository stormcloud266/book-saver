import { SessionProvider } from 'next-auth/react'
import { FavoritesProvider } from '../context/favorites-context'
import Layout from '../components/layout/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider session={pageProps.session}>
			<FavoritesProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</FavoritesProvider>
		</SessionProvider>
	)
}

export default MyApp
