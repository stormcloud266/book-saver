import { useRef, useState } from 'react'
import styles from './search.module.css'

const Search = ({ setLoading, setError, setBooks }) => {
	const [isTitle, setIsTitle] = useState(true)
	const searchRef = useRef()

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
		<div className={styles.container}>
			<form className={styles.form} onSubmit={submitHandler}>
				<input
					type='text'
					placeholder='search'
					ref={searchRef}
					className={styles.input}
				/>
				<div className={styles.radioSection}>
					<div className={styles.radioContainer}>
						<label htmlFor='book'>Title</label>
						<input
							type='radio'
							value='book'
							id='book'
							checked={isTitle}
							onChange={radioHandler}
							className={styles.radio}
						/>
					</div>
					<div className={styles.radioContainer}>
						<label htmlFor='author'>Author</label>
						<input
							type='radio'
							value='author'
							id='author'
							checked={!isTitle}
							onChange={radioHandler}
							className={styles.radio}
						/>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Search
