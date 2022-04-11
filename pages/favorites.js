import BookCard from '../components/book/book-card'
import { useFavorites } from '../context/favorites-context'
// import * as styles from './favorites.module.scss'

const Favorites = () => {
	const { favorites } = useFavorites()

	return (
		<div>
			{!favorites || favorites.length === 0 ? (
				<p>no favorites</p>
			) : (
				favorites.map((book) => (
					<BookCard
						title={book.title}
						first_publish_year={book.first_publish_year}
						cover_i={book.cover_i}
						id_goodreads={book.id_goodreads}
						book_id={book.book_id}
						key={book.book_id}
					/>
				))
			)}
		</div>
	)
}

export default Favorites
