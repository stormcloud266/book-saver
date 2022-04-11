import React, { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export const useFavorites = () => {
	return useContext(FavoritesContext)
}

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([])

	useEffect(async () => {
		const results = await fetch('/api/user/favorites')
		const data = await results.json()
		const favorites = !data.favorites ? [] : data.favorites
		setFavorites(favorites)
	}, [])

	return (
		<FavoritesContext.Provider value={{ favorites, setFavorites }}>
			{children}
		</FavoritesContext.Provider>
	)
}
