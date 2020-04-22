import React, { useState, useContext } from "react"
import { AuthContext } from "../../authContext/AuthContext"
import styled from "styled-components"
import axios from "axios"

const AuthContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 50%;
	height: 100%;
	background-color: #f7f6f6;
	border-bottom-right-radius: 20px;
	border-top-right-radius: 20px;
`
const Input = styled.input`
	padding: 10px 10px;
	padding-left: 20px;
	border-radius: 30px;
	border: 1px solid #0a4f70;
	font-size: 15px;
	line-height: 25px;
	font-weight: 600;
	outline: none;
	margin-top: 15px;
	background: #f7f6f6;
	color: #0a4f70;
	/* margin-right: 10px; */
`
const Button = styled.button`
	padding: 8px 20px;
	border: 1px solid #0a4f70;
	color: #0a4f70;
	border-radius: 15px;
	cursor: pointer;
	transition: 0.2s all ease;
	outline: none;
	margin-top: 10px;
	background: #f7f6f6;
	text-transform: uppercase;
	font-weight: 600;

	&:hover {
		transform: scale(1.1);
		background: #51c5dd;
		color: #f7f6f6;
	}
`
const SwitchMode = styled.button`
	border: none;
	background: none;
	outline: none;
	font-size: 15px;
	cursor: pointer;
	color: blue;
	background: #f7f6f6;
	color: #0a4f70;
	text-transform: uppercase;
	font-weight: 700;
`
const ErrorText = styled.span`
	margin: 0;
	margin-top: 10px;
	font-size: 14px;
	background: #f7f6f6;
	color: #0a4f70;
`

function Auth() {
	const auth = useContext(AuthContext)
	const [isLoginMode, setIsLoginMode] = useState(true)
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	})
	const [signupData, setSignupData] = useState({
		name: "",
		email: "",
		password: "",
	})
	const [isInputValid, setIsInputValid] = useState({
		name: true,
		email: true,
		password: true,
	})
	const [isError, setIsError] = useState(false)

	const onChangeAuthHandler = (event) => {
		isLoginMode
			? setLoginData({
					...loginData,
					[event.target.name]: event.target.value,
			  })
			: setSignupData({
					...signupData,
					[event.target.name]: event.target.value,
			  })
	}

	const authSubmitHandler = async (event) => {
		event.preventDefault()

		if (isLoginMode) {
			try {
				const responseData = await axios.post(
					"http://localhost:5000/user/login",
					loginData
				)
				const data = responseData.data
				setIsError(false)
				auth.login(data.userId, data.token)
			} catch (err) {
				setIsError(true)
			}
		} else {
			try {
				const responseData = await axios.post(
					"http://localhost:5000/user/new",
					signupData
				)
				const data = responseData.data
				setIsError(false)
				auth.login(data.userId, data.token)
			} catch (err) {
				setIsError(true)
			}
		}
	}

	/* 	const checkInput = (event) => {
		if (isLoginMode) {
			if (loginData.email === "") {
				setIsInputValid({ ...isInputValid, email: false })
			}
			if (!loginData.password) {
				setIsInputValid({ ...isInputValid, password: false })
			}
		} else {
			if (!signupData.email) {
				setIsInputValid({ ...isInputValid, email: false })
			}
			if (!signupData.password) {
				setIsInputValid({ ...isInputValid, password: false })
			}
			if (!signupData.name) {
				setIsInputValid({ ...isInputValid, name: false })
			}
		}
	}
 */
	const LoginComponent = (
		<AuthContainer>
			<h2
				style={{
					background: "#f7f6f6",
					textTransform: "uppercase",
					margin: 0,
					color: "#0a4f70",
				}}
			>
				Login
			</h2>
			<Input
				type="email"
				placeholder="email"
				name="email"
				onChange={onChangeAuthHandler}
				value={loginData.email}
			/>
			{!isInputValid.email && (
				<ErrorText>PLease provid valid email</ErrorText>
			)}
			<Input
				type="password"
				placeholder="password"
				name="password"
				onChange={onChangeAuthHandler}
				value={loginData.password}
			/>
			{!isInputValid.password && (
				<ErrorText>PLease provid valid password</ErrorText>
			)}
			{isError && (
				<ErrorText>
					Can't log you in, please check your email/password
				</ErrorText>
			)}
			<Button onClick={authSubmitHandler}>Login</Button>
			<p
				style={{
					background: "#f7f6f6",
					textTransform: "uppercase",
					fontSize: "14px",
					color: "#0a4f70",
				}}
			>
				Don't have an account?,
				<SwitchMode
					onClick={() => {
						setIsLoginMode(!isLoginMode)
						setIsInputValid({
							name: true,
							email: true,
							password: true,
						})
						setIsError(false)
					}}
				>
					Sign Up
				</SwitchMode>
			</p>
		</AuthContainer>
	)

	const SignUpComponent = (
		<AuthContainer>
			<h2
				style={{
					background: "#f7f6f6",
					textTransform: "uppercase",
					margin: 0,
					color: "#0a4f70",
				}}
			>
				Sign Up
			</h2>
			<Input
				type="text"
				placeholder="Your full name"
				name="name"
				onChange={onChangeAuthHandler}
				value={signupData.name}
			/>
			{!isInputValid.email && (
				<ErrorText>PLease provid valid name</ErrorText>
			)}
			<Input
				type="email"
				placeholder="email"
				name="email"
				onChange={onChangeAuthHandler}
				value={signupData.email}
			/>
			{!isInputValid.email && (
				<ErrorText>PLease provid valid email</ErrorText>
			)}
			<Input
				type="password"
				placeholder="password"
				name="password"
				onChange={onChangeAuthHandler}
				value={signupData.password}
			/>
			{!isInputValid.password && (
				<ErrorText>PLease provid valid password</ErrorText>
			)}
			{isError && (
				<ErrorText>
					Can't sign you up, please check your field
				</ErrorText>
			)}
			<Button onClick={authSubmitHandler}>Sign Up</Button>
			<p
				style={{
					background: "#f7f6f6",
					textTransform: "uppercase",
					fontSize: "14px",
					color: "#0a4f70",
				}}
			>
				Already had an account?,
				<SwitchMode
					onClick={() => {
						setIsLoginMode(!isLoginMode)
						setIsInputValid({
							name: true,
							email: true,
							password: true,
						})
						setIsError(false)
					}}
				>
					Login
				</SwitchMode>
			</p>
		</AuthContainer>
	)

	const authRender = isLoginMode ? LoginComponent : SignUpComponent

	return authRender
}

export default Auth
