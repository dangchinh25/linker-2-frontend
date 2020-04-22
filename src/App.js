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
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage"
import UserPage from "./pages/UserPage/UserPage"

function App() {
	const { token, login, logout, userId } = useAuth()

	let routes

	if (token) {
		routes = (
			<Switch>
				<Route path="/forum" component={ForumPage} />
				<Route path="/discover" component={DiscoverPage} />
				<Route path="/user/:uid" component={UserPage} />
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
