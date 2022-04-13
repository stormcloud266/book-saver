import React from 'react'
import styles from './search.module.css'

export function Radio({ checked, radioHandler, value }) {
	return (
		<div className={styles.radioContainer}>
			<input
				type='radio'
				value={value}
				id={value}
				checked={checked}
				onChange={radioHandler}
				className={styles.radio}
			/>
			<label htmlFor={value} className={styles.radioLabel}>
				<span className={styles.radioLabelText}>{value}</span>
				<span className={styles.radioLabelDot} />
			</label>
		</div>
	)
}
