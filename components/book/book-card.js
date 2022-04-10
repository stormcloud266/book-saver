import React from 'react'
import Image from 'next/image'
// import * as styles from './book-card.module.scss'

const BookCard = ({
	book: { title, first_publish_year, cover_i, id_goodreads, key },
}) => {
	const favoriteHandler = async () => {
		const response = await fetch('/api/user/favorite', {
			method: 'POST',
			body: JSON.stringify({
				bookID: key,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const data = await response.json()
		console.log('data: ', data)
	}

	// async function createUser(email, password) {
	//   const response = await fetch('/api/auth/signup', {
	//     method: 'POST',
	//     body: JSON.stringify({ email, password }),

	//   })

	return (
		<div>
			<p>
				<b>{title}</b>
			</p>
			<button onClick={favoriteHandler}>fav</button>
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
