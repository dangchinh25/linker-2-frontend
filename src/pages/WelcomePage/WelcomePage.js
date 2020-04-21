import React from "react"
import styled from "styled-components"
import Auth from "./Auth"

const WelcomeContainer = styled.div`
	box-sizing: border-box;
	display: flex;
	height: 90vh;
	width: 80%;
	justify-content: center;
	align-items: center;
	margin: auto;
	border: 1px solid black;
`

const WelcomeText = styled.div`
	display: flex;
	width: 50%;
	height: 100%;
	justify-content: center;
	align-items: center;
	background-color: #f3f3f3;
`

function WelcomePage() {
	return (
		<WelcomeContainer>
			<WelcomeText>
				<h1>Welcome page</h1>
			</WelcomeText>
			<Auth />
		</WelcomeContainer>
	)
}

export default WelcomePage
