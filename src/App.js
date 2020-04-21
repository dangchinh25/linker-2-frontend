import React from "react"
import "./App.css"
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom"
import { AuthContext } from "./authContext/AuthContext"
import { useAuth } from "./CustomHooks/authHook"
import WelcomePage from "./pages/WelcomePage/WelcomePage"
import ForumPage from "./pages/ForumPage/ForumPage"

function App() {
	const { token, login, logout, userId } = useAuth()

	let routes

	if (token) {
		routes = (
			<Switch>
				<Route path="/forum" component={ForumPage} />
				<Redirect to="/forum" />
			</Switch>
		)
	} else {
		routes = (
			<Switch>
				<Route path="/" exact component={WelcomePage} />
				<Redirect to="/" />
			</Switch>
		)
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				login: login,
				logout: logout,
			}}
		>
			<div className="App">
				<Router>{routes}</Router>
			</div>
		</AuthContext.Provider>
	)
}

export default App
