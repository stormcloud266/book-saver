import React from 'react'
import Image from 'next/image'
// import * as styles from './book-card.module.scss'

const BookCard = ({
	book: { title, first_publish_year, cover_i, id_goodreads, key },
}) => {
	return (
		<div>
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
