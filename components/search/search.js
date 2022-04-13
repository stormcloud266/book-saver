import { Radio } from './radio'
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
		setIsTitle(event.target.value === 'title')
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
					<Radio checked={isTitle} radioHandler={radioHandler} value='title' />
					<Radio
						checked={!isTitle}
						radioHandler={radioHandler}
						value='author'
					/>
				</div>
			</form>
		</div>
	)
}

export default Search
