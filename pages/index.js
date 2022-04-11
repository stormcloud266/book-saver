import { useRef, useState } from 'react'
import StartingPageContent from '../components/starting-page/starting-page'
import BookCard from '../components/book/book-card'
const test = require('../test.json')

function HomePage() {
	// return <StartingPageContent />;
	const searchRef = useRef()
	const [isTitle, setIsTitle] = useState(true)
	const [books, setBooks] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const submitHandler = async (event) => {
		event.preventDefault()

		setLoading(true)
		setError(false)
		setBooks(undefined)

		const response = await fetch(
			`http://openlibrary.org/search.json?${
				isTitle ? 'title' : 'author'
			}=${encodeURI(searchRef.current.value)}&limit=2`
		)

		const data = await response.json()

		if (!response.ok) {
			setLoading(false)
			setError(true)
			return
		}

		setBooks(data)
		setLoading(false)
	}

	const radioHandler = (event) => {
		setIsTitle(event.target.value === 'book')
	}

	return (
		<div>
			<form onSubmit={submitHandler}>
				<input type='text' placeholder='search' ref={searchRef} />
				<label>
					<input
						type='radio'
						value='book'
						checked={isTitle}
						onChange={radioHandler}
					/>
					Title
				</label>
				<label>
					<input
						type='radio'
						value='author'
						checked={!isTitle}
						onChange={radioHandler}
					/>
					Author
				</label>
			</form>

			{loading && <h2>loading...</h2>}
			{error && <h2>error...</h2>}

			{test.docs.map((book) => (
				<BookCard
					title={book.title}
					first_publish_year={book.first_publish_year}
					cover_i={book.cover_i}
					id_goodreads={book.id_goodreads}
					book_id={book.key}
					key={book.key}
				/>
			))}

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
