import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './book-card.module.css'
import { useFavorites } from '../../context/favorites-context'

const BookCard = ({
	title,
	first_publish_year,
	cover_i,
	id_goodreads,
	book_id,
	isLoggedIn,
}) => {
	const book = { title, first_publish_year, cover_i, id_goodreads, book_id }
	const { favorites, setFavorites } = useFavorites()
	const [isFavorite, setIsFavorite] = useState(false)
	const imageUrl = cover_i
		? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
		: 'http://placehold.jp/3d4070/ffffff/200x300.jpg?text=Image%20Not%20Available'

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
		<div className={styles.card}>
			<div className={styles.imageContainer}>
				<Image height={300} width={180} objectFit='contain' src={imageUrl} />
			</div>

			{isLoggedIn && (
				<button className={styles.favorite} onClick={toggleFavorite}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill={isFavorite ? 'pink' : 'none'}
						viewBox='0 0 24 24'
						stroke={isFavorite ? 'pink' : '#8b8bac'}
						strokeWidth={2}
						height={26}
						width={26}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
						/>
					</svg>
				</button>
			)}

			<div className={styles.textContainer}>
				<div>
					<h3 className={styles.title}>{title}</h3>

					<p className={styles.year}>
						<small>Published:</small>
						{first_publish_year}
					</p>
				</div>

				{id_goodreads && (
					<a
						href={`https://www.goodreads.com/book/show/${id_goodreads[0]}`}
						target='_blank'
						rel='noopener noreferrer'
						className={styles.button}
					>
						Open In Goodreads
					</a>
				)}
			</div>
		</div>
	)
}

export default BookCard
