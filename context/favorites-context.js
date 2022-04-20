import React, { createContext, useContext, useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'

const FavoritesContext = createContext()

export const useFavorites = () => {
	return useContext(FavoritesContext)
}

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([])
	const [isLoaded, setIsLoaded] = useState(false)

	const getFavorites = async () => {
		const session = await getSession()

		if (session) {
			const results = await fetch('/api/user/favorites')
			const data = await results.json()
			const favorites = !data.favorites ? [] : data.favorites
			setIsLoaded(true)
			setFavorites(favorites)
		}
	}

	useEffect(() => {
		getFavorites().catch((err) => console.log(err))
	}, [])

	return (
		<FavoritesContext.Provider value={{ favorites, setFavorites, isLoaded }}>
			{children}
		</FavoritesContext.Provider>
	)
}
