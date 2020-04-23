import React, { useState, useEffect } from "react"
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

		.button-group {
			display: flex;
			width: 100%;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
			background-color: #f7f6f6;
			box-sizing: border-box;
			margin-top: 10px;
		}

		.info-group {
			display: flex;
			width: 100%;
			flex-direction: row;
			justify-content: space-between;
			background-color: #f7f6f6;
			margin-top: 10px;
			box-sizing: border-box;

			.experience {
				display: flex;
				flex-direction: column;
				background-color: #f7f6f6;

				span {
					background-color: #f7f6f6;
				}
			}

			.personal-info {
				background-color: #f7f6f6;

				span {
					background-color: #f7f6f6;
					margin-right: 15px;
				}

				p {
					background-color: #f7f6f6;
				}
			}
		}
	}
`

function MyProfilePage() {
	const [personalInfo, setPersonalInfo] = useState({})

	useEffect(() => {
		const userId = JSON.parse(localStorage.getItem("userData")).userId
		const getMyInfo = async () => {
			try {
				const responseData = await axios.get(
					`http://localhost:5000/user/${userId}`
				)
				setPersonalInfo(responseData.data)
			} catch (error) {
				console.log(error)
			}
		}
		getMyInfo()
	}, [])

	return (
		<React.Fragment>
			<HeaderNav />
			<PageContainer>
				<GeneralInfo>
					<div className="image"></div>
					<div className="info">
						<img src="/logo192.png" />
						<div className="button-group">
							<button>Connect</button>
							<button>Connect</button>
							<button>Connect</button>
						</div>
						<div className="info-group">
							<div className="personal-info">
								<span>{personalInfo.name}</span>
								<span>{personalInfo.age}</span>
								<p>{personalInfo.gender}</p>
							</div>
							<div className="experience">
								<span>Google</span>
								<span>Microsoft</span>
							</div>
						</div>
					</div>
				</GeneralInfo>
			</PageContainer>
		</React.Fragment>
	)
}

export default MyProfilePage
