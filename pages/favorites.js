import { getSession } from 'next-auth/client'
import BookCard from '../components/book/book-card'
import Grid from '../components/grid/grid'
import { useFavorites } from '../context/favorites-context'
// import * as styles from './favorites.module.scss'

const Favorites = () => {
	const { favorites, isLoaded } = useFavorites()

	return (
		<div>
			{!isLoaded && <h2>loading</h2>}

			{isLoaded && (!favorites || favorites.length === 0) ? (
				<p>no favorites</p>
			) : (
				<Grid>
					{favorites.map((book) => (
						<BookCard
							title={book.title}
							first_publish_year={book.first_publish_year}
							cover_i={book.cover_i}
							id_goodreads={book.id_goodreads}
							book_id={book.book_id}
							key={book.book_id}
							isLoggedIn={isLoaded}
						/>
					))}
				</Grid>
			)}
		</div>
	)
}
export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req })

	if (!session) {
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

export default Favorites
