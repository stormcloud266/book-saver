import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/client'
import { useFavorites } from '../context/favorites-context'
import Search from '../components/search/search'
import BookCard from '../components/book/book-card'
import Grid from '../components/grid/grid'
import Placeholder from '../components/placeholder/placeholder'

const test = require('../test.json')

function HomePage() {
	const [books, setBooks] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const { isLoaded } = useFavorites()

	useEffect(() => {
		getSession().then((session) => {
			setIsLoggedIn(!!session)
		})
	}, [])

	return (
		<div>
			<Search setLoading={setLoading} setError={setError} setBooks={setBooks} />

			{loading && <h2>loading...</h2>}
			{error && <h2>error...</h2>}
			{books?.numFound === 0 && <h2>no results</h2>}
			{(!books || books?.numFound === 0) && <Placeholder />}

			{books && !error && (
				<Grid>
					{books.docs.map((book) => (
						<BookCard
							title={book.title}
							first_publish_year={book.first_publish_year}
							cover_i={book.cover_i}
							id_goodreads={book.id_goodreads}
							book_id={book.key}
							key={book.key}
							isLoggedIn={isLoggedIn && isLoaded}
						/>
					))}
				</Grid>
			)}
		</div>
	)
}

export default HomePage
