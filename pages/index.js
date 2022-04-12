import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/client'
import { useFavorites } from '../context/favorites-context'
import Search from '../components/search/search'
import BookCard from '../components/book/book-card'
import Grid from '../components/grid/grid'

const test = require('../test.json')

function HomePage() {
	// return <StartingPageContent />;
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

			<Grid>
				{test.docs.map((book) => (
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

			{/* {books && !error && (
				<div>
					{books.docs.length === 0 ? (
						<h2>no results</h2>
					) : (
						<>
							{books.docs.map(
								({ title, first_publish_year, cover_i, id_goodreads }) => (
									<div key={cover_i}>
										<p>
											<b>{title}</b>
										</p>
										<p>
											<small>{first_publish_year}</small>
										</p>
										<Image
											layout='intrinsic'
											width={200}
											height={300}
											src={`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`}
										/>
										<a
											href={`https://www.goodreads.com/book/show/${id_goodreads[0]}`}
											target='_blank'
											rel='noopener noreferrer'
										>
											Open In Goodreads
										</a>
									</div>
								)
							)}
						</>
					)}
				</div>
			)} */}
		</div>
	)
}

export default HomePage
