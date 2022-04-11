import { Provider } from 'next-auth/client'
import { FavoritesProvider } from '../context/favorites-context'
import Layout from '../components/layout/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<FavoritesProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</FavoritesProvider>
		</Provider>
	)
}

export default MyApp
