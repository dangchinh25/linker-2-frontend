import React, { useState, useContext } from "react"
import styled from "styled-components"
import { AuthContext } from "../../authContext/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faUsers,
	faCompass,
	faEnvelope,
	faBell,
	faUserCircle,
	faAddressCard,
	faCog,
	faSortDown,
} from "@fortawesome/free-solid-svg-icons"

const HeaderContainer = styled.div`
	display: flex;
	position: relative;
	width: 60%;
	margin: auto;
	justify-content: flex-end;
	align-items: center;
	border-bottom: 1px solid #7e7980;
	user-select: none;
`
const LogoContainer = styled.div`
	position: absolute;
	left: 0;
`
const HeaderOption = styled.div`
	width: 80px;
	height: 50px;
	margin: 10px 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	color: #7e7980;

	.my-profile-select {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	p {
		margin: 0;
	}

	svg {
		font-size: 1.5rem;
	}

	&:nth-child(6) {
		position: relative;
		width: 100px;
	}
`
const ProfileSelect = styled.div`
	position: absolute;
	width: 200px;
	z-index: 999;
	top: 55px;
	right: -1px;
	background-color: #f8f8f8;

	.select-option {
		display: flex;
		width: 100%;
		justify-content: flex-start;
		align-items: center;
		border: 1px solid black;
		border-bottom: none;
		border-top: none;
		padding: 5px 10px;

		svg {
			margin-right: 10px;
		}

		&:hover {
			background-color: #ac3d54;
			color: #f4f7f6;
		}
	}

	.select-option:nth-child(1) {
		padding-top: 10px;
		border-top: 1px solid black;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.select-option:nth-child(3) {
		border-top: 1px solid black;
		border-bottom: 1px solid black;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		padding-top: 10px;
		padding-bottom: 10px;
	}
`

function HeaderNav() {
	const [isProfileOpen, setIsProfileOpen] = useState(false)
	const auth = useContext(AuthContext)

	return (
		<HeaderContainer>
			<LogoContainer>Logo</LogoContainer>

			<HeaderOption>
				<FontAwesomeIcon icon={faUsers} />
				Forum
			</HeaderOption>
			<HeaderOption>
				<FontAwesomeIcon icon={faCompass} />
				Discover
			</HeaderOption>
			<HeaderOption>
				<FontAwesomeIcon icon={faEnvelope} />
				Messages
			</HeaderOption>
			<HeaderOption>
				<FontAwesomeIcon icon={faBell} />
				Notification
			</HeaderOption>
			<HeaderOption
				onClick={() => setIsProfileOpen(!isProfileOpen)}
				row
			>
				<FontAwesomeIcon icon={faUserCircle} />
				<div className="my-profile-select">
					<span>My profile</span>
					<FontAwesomeIcon icon={faSortDown} />
				</div>
				{isProfileOpen && (
					<ProfileSelect>
						<div className="select-option">
							<FontAwesomeIcon icon={faAddressCard} />
							<span>My Profile</span>
						</div>
						<div className="select-option">
							<FontAwesomeIcon icon={faCog} />
							<span>Setting</span>
						</div>
						<div
							className="select-option"
							onClick={auth.logout}
						>
							<span>Sign Out</span>
						</div>
					</ProfileSelect>
				)}
			</HeaderOption>
		</HeaderContainer>
	)
}

export default HeaderNav
