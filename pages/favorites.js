import { useState, useEffect } from 'react'
import BookCard from '../components/book/book-card'
// import * as styles from './favorites.module.scss'

const Favorites = () => {
	const [favorites, setFavorites] = useState([])

	useEffect(async () => {
		const results = await fetch('/api/user/favorites')
		const data = await results.json()
		setFavorites(data.favorites)
	}, [])

	return (
		<div>
			{favorites.map((book) => (
				<BookCard book={book} key={book.key} />
			))}
		</div>
	)
}

export default Favorites
