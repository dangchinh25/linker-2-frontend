import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import HeaderNav from "../../components/shared/HeaderNav"
import axios from "axios"

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 60%;
	margin: auto;
	box-sizing: border-box;
	margin-top: 20px;
	margin-bottom: 50px;
`

const GeneralInfo = styled.div`
	height: 300px;
	width: 100%;
	background-color: #f7f6f6;
	box-sizing: border-box;

	.image {
		width: 100%;
		height: 30%;
		background-color: #0a4f70;
	}

	.info {
		width: 100%;
		height: 70%;
		background-color: #f7f6f6;
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 15px 15px 0px 15px;
		box-sizing: border-box;

		img {
			width: 100px;
			height: auto;
			position: absolute;
			background-color: none;
			background: none;
			top: -25%;
			left: 20px;
			border: 1px solid #c6c4c4;
			border-radius: 50%;
			padding: 7px;
		}
	}
`

const Button = styled.button`
	width: 100px;
	padding: 8px 10px;
	border-radius: 10px;
	border: none;
	background-color: #0a4f70;
	color: #c6c4c4;
	font-weight: 600;
	text-transform: uppercase;
	margin-left: 10px;
	cursor: pointer;

	&:hover {
		background-color: #f04c63;
		color: #0a4f70;
	}
`

const ButtonGroup = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	background-color: #f7f6f6;
	box-sizing: border-box;
	margin-top: 10px;

	button {
		&:disabled {
			cursor: default;
			background-color: #c6c4c4;
			color: #f7f6f6;
		}
	}
`

const InfoGroup = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	background-color: #f7f6f6;
	box-sizing: border-box;

	.personal-info {
		background-color: #f7f6f6;

		span {
			background-color: #f7f6f6;
			margin-right: 15px;

			&.name {
				font-size: 25px;
			}

			&.age {
				font-size: 20px;
			}
		}

		p {
			background-color: #f7f6f6;
		}
	}
`

const ExperienceGroup = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #f7f6f6;
	margin-top: 10px;
	margin-right: 30px;

	span {
		background-color: #f7f6f6;
		font-size: 18px;
	}
`

function UserPage() {
	const [userInfo, setUserInfo] = useState({})
	const { uid } = useParams()
	const [hasSentRequest, setHasSentRequest] = useState(false)
	const [hasConnected, setHasConnected] = useState(false)
	const [isAccept, setIsAccept] = useState(false)

	useEffect(() => {
		const userId = JSON.parse(localStorage.getItem("userData")).userId
		const getMyInfo = async () => {
			try {
				const responseData = await axios.get(
					`http://localhost:5000/user/${userId}`
				)
				const pendingRequest = responseData.data.pendingRequest
				const incomingRequest = responseData.data.incomingRequest
				const peopleConnected = responseData.data.peopleConnected

				for (let request of incomingRequest) {
					if (request.toString() === uid.toString()) {
						setIsAccept(true)
						break
					}
				}

				for (let request of pendingRequest) {
					if (request.toString() === uid.toString()) {
						setHasSentRequest(true)
						break
					}
				}

				for (let request of peopleConnected) {
					if (request.toString() === uid.toString()) {
						setHasConnected(true)
						break
					}
				}
			} catch (error) {
				console.log(error)
			}
		}
		getMyInfo()
	})

	useEffect(() => {
		const getUserInfo = async () => {
			try {
				const responseData = await axios.get(
					`http://localhost:5000/user/${uid}`
				)
				setUserInfo(responseData.data)
			} catch (error) {
				console.log(error)
			}
		}
		getUserInfo()
	}, [])

	const onClickConnect = (event) => {
		event.preventDefault()
		const requestConnect = async () => {
			try {
				const responseData = axios.post(
					`http://localhost:5000/user/connect/${uid}`,
					{},
					{
						headers: {
							Authorization: `Bearer ${
								JSON.parse(
									localStorage.getItem("userData")
								).token
							}`,
						},
					}
				)
				window.location.reload(true)
			} catch (error) {
				console.log(error)
			}
		}
		requestConnect()
	}

	const onClickAccept = (event) => {
		event.preventDefault()
		const acceptConnect = async () => {
			try {
				const responseData = axios.post(
					`http://localhost:5000/user/connect/${uid}/accept`,
					{},
					{
						headers: {
							Authorization: `Bearer ${
								JSON.parse(
									localStorage.getItem("userData")
								).token
							}`,
						},
					}
				)
				window.location.reload(true)
			} catch (error) {
				console.log(error)
			}
		}
		acceptConnect()
	}

	let buttonActionGroup
	if (isAccept) {
		buttonActionGroup = (
			<ButtonGroup>
				<Button onClick={onClickAccept}>Accept</Button>
				<Button disabled>Message</Button>
			</ButtonGroup>
		)
	} else if (hasConnected) {
		buttonActionGroup = (
			<ButtonGroup>
				<Button disabled>Connected</Button>
				<Button>Message</Button>
			</ButtonGroup>
		)
	} else if (hasSentRequest) {
		buttonActionGroup = (
			<ButtonGroup>
				<Button disabled>Pending</Button>
				<Button disabled>Message</Button>
			</ButtonGroup>
		)
	} else if (!hasSentRequest) {
		buttonActionGroup = (
			<ButtonGroup>
				<Button onClick={onClickConnect}>Connect</Button>
				<Button disabled>Message</Button>
			</ButtonGroup>
		)
	}

	return (
		<React.Fragment>
			<HeaderNav />
			<PageContainer>
				<GeneralInfo>
					<div className="image"></div>
					<div className="info">
						<img src="/logo192.png" />
						{buttonActionGroup}
						<InfoGroup>
							<div className="personal-info">
								<span className="name">
									{userInfo.name}
								</span>
								<span className="age">
									{userInfo.age}
								</span>
								<p>{userInfo.gender}</p>
							</div>
							<ExperienceGroup>
								<span>Google</span>
								<span>Microsoft</span>
							</ExperienceGroup>
						</InfoGroup>
					</div>
				</GeneralInfo>
			</PageContainer>
		</React.Fragment>
	)
}

export default UserPage
