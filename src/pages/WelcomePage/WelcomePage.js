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
	margin-top: 20px;
`

const WelcomeText = styled.div`
	display: flex;
	width: 50%;
	height: 100%;
	justify-content: center;
	align-items: center;
	background: #c6c4c4;
	border-bottom-left-radius: 20px;
	border-top-left-radius: 20px;

	h1 {
		background: #c6c4c4;
		text-transform: uppercase;
		font-size: 48px;
		font-weight: 900;
	}
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
