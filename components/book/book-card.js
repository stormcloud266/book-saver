import { useEffect, useState } from 'react'
import Image from 'next/image'
// import * as styles from './book-card.module.scss'
import { useFavorites } from '../../context/favorites-context'

const BookCard = ({
	title,
	first_publish_year,
	cover_i,
	id_goodreads,
	book_id,
}) => {
	const book = { title, first_publish_year, cover_i, id_goodreads, book_id }
	const { favorites, setFavorites } = useFavorites()
	const [isFavorite, setIsFavorite] = useState(false)

	useEffect(() => {
		setIsFavorite(!!favorites.find((item) => item.book_id === book.book_id))
	}, [favorites, setFavorites])

	const toggleFavorite = async () => {
		if (!isFavorite) {
			setFavorites((prevState) => prevState.concat(book))
		} else {
			const filteredArr = favorites.filter(
				(item) => item.book_id !== book.book_id
			)
			setFavorites(filteredArr)
		}

		await updateFavorites()
	}

	const updateFavorites = async () => {
		const response = await fetch('/api/user/favorites', {
			method: 'POST',
			body: JSON.stringify({ book }),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const data = await response.json()
	}

	return (
		<div>
			<p>
				<b>{title}</b>
			</p>
			<button
				style={{
					backgroundColor: isFavorite ? 'pink' : 'lightgray',
				}}
				onClick={toggleFavorite}
			>
				fav
			</button>
			<p>
				<small>{first_publish_year}</small>
			</p>
			{/* <Image
				layout='intrinsic'
				width={200}
				height={300}
				src={`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`}
			/> */}
			{/* <a
						href={`https://www.goodreads.com/book/show/${id_goodreads[0]}`}
						target='_blank'
						rel='noopener noreferrer'
					>
						Open In Goodreads
					</a> */}
		</div>
	)
}

export default BookCard
