import { useState, useCallback, useEffect } from "react"

let logoutTimer

export const useAuth = () => {
	const [token, setToken] = useState()
	const [tokenExpDate, setTokenExpDate] = useState()
	const [userId, setUserId] = useState()

	const login = useCallback((userId, token, expDate) => {
		setToken(token)
		setUserId(userId)

		const tokenExpirationDate =
			expDate || new Date(new Date().getTime() + 1000 * 60 * 60)
		setTokenExpDate(tokenExpirationDate)
		localStorage.setItem(
			"userData",
			JSON.stringify({
				userId: userId,
				token: token,
				expiration: tokenExpirationDate.toISOString(),
			})
		)
	}, [])

	const logout = useCallback(() => {
		setToken(null)
		setTokenExpDate(null)
		setUserId(null)
		localStorage.removeItem("userData")
	}, [])

	useEffect(() => {
		if (token && tokenExpDate) {
			const remainingTime =
				tokenExpDate.getTime() - new Date().getTime()
			logoutTimer = setTimeout(logout, remainingTime)
		} else {
			clearTimeout(logoutTimer)
		}
	}, [token, logout, tokenExpDate])

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem("userData"))
		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		) {
			login(
				storedData.userId,
				storedData.token,
				new Date(storedData.expiration)
			)
		}
	}, [login])

	return { token, login, logout, userId }
}
