import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
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

			{loading && <p className='message mt'>Loading...</p>}
			{error && <p className='message mt'>Please try another search</p>}
			{books?.numFound === 0 && <p className='message mt'>No results</p>}
			{(!books || books?.numFound === 0) && !loading && <Placeholder />}

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
