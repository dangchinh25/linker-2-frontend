import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faHeart,
	faHeartBroken,
	faEllipsisH,
} from "@fortawesome/free-solid-svg-icons"
import { createEditor } from "slate"
import { Slate, Editable, withReact } from "slate-react"
import axios from "axios"
import CreateNewPost from "./CreateNewPost"

const PostContainer = styled.div`
	box-sizing: border-box;
	border: 1px solid black;
	border-radius: 15px;
	padding: 12px 18px;
	display: flex;
	flex-direction: column;
	margin-top: 20px;
`
const PostTitleContainer = styled.div`
	box-sizing: border-box;
	font-size: 1.3rem;
	text-transform: uppercase;
	margin-bottom: 10px;
`

const PostContentContainer = styled.div`
	margin-bottom: 10px;
	font-weight: 400;
	user-select: none;
`

const VotesContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`

const ButtonContainer = styled.div`
	display: flex;
	width: 100px;
	justify-content: space-around;
	align-items: center;
	box-sizing: border-box;
	margin-right: 10px;
	cursor: pointer;
	padding: 5px 10px;
	border-radius: 10px;

	svg {
		font-size: 1.3rem;
	}

	&:hover {
		background-color: #333;
	}
`

const UserContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 5px;

	button {
		position: relative;
		border: none;
		background: none;
		cursor: pointer;
		outline: none;

		.user-option {
			position: absolute;
			background-color: #f8f8f8;
			width: 100px;
			top: 20px;
			right: 0;
			z-index: 999;

			.user-option-row {
				display: flex;
				width: 100%;
				justify-content: flex-start;
				align-items: center;
				border: 1px solid black;
				border-bottom: none;
				border-top: none;
				padding: 5px 10px;

				&:hover {
					background-color: #333;
				}
			}

			.user-option-row:nth-child(1) {
				padding-top: 10px;
				border-top: 1px solid black;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
			}
			.user-option-row:nth-child(2) {
				border-top: 1px solid black;
				border-bottom: 1px solid black;
				border-bottom-left-radius: 10px;
				border-bottom-right-radius: 10px;
				padding-top: 10px;
				padding-bottom: 10px;
			}
		}
	}
`

const TagContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	margin-bottom: 5px;

	a {
		color: black;
		font-size: 14px;
		padding: 5px 7px;
		border-radius: 5px;
		border: 1px solid black;
		font-weight: 500;
		margin-right: 4px;
		line-height: 1.1;
		display: inline-block;
		text-decoration: none;
		cursor: pointer;

		&:hover {
			background-color: #333;
		}
	}
`

function Post({ title, text, votes, userOwner, postId, tags }) {
	const [userInfo, setUserInfo] = useState({
		name: "",
	})
	const [isOpenOption, setIsOpenOption] = useState(false)
	const currentUserId = JSON.parse(localStorage.getItem("userData")).userId
	const [isEdit, setIsEdit] = useState(false)
	const [postEdit, setPostEdit] = useState({
		title: title,
		text: text,
	})

	useEffect(() => {
		const getUser = async () => {
			try {
				const responsData = await axios.get(
					`http://localhost:5000/user/${userOwner}`
				)
				setUserInfo({ ...userInfo, name: responsData.data.name })
			} catch (error) {}
		}
		getUser()
	}, [])

	const onClickOption = (event) => {
		event.preventDefault()
		setIsOpenOption(!isOpenOption)
	}

	const onClickDelete = async (event) => {
		event.preventDefault()
		try {
			const responsData = await axios.delete(
				`http://localhost:5000/post/delete/${postId}`,
				{
					headers: {
						Authorization: `Bearer ${
							JSON.parse(localStorage.getItem("userData"))
								.token
						}`,
					},
				}
			)
			window.location.reload(true)
		} catch (error) {}
	}

	const onClickEdit = () => {
		setIsEdit(true)
	}

	return !isEdit ? (
		<PostContainer>
			<UserContainer>
				<span>{userInfo.name}</span>
				{currentUserId === userOwner && (
					<button onClick={onClickOption}>
						<FontAwesomeIcon icon={faEllipsisH} />

						{isOpenOption && (
							<div className="user-option">
								<div
									className="user-option-row"
									onClick={onClickEdit}
								>
									<span>Edit</span>
								</div>
								<div
									className="user-option-row"
									name="delete"
									onClick={onClickDelete}
								>
									<span>Delete</span>
								</div>
							</div>
						)}
					</button>
				)}
			</UserContainer>

			<TagContainer>
				{tags.map((item) => (
					<a>{item}</a>
				))}
			</TagContainer>

			<PostTitleContainer>
				<span>{title}</span>
			</PostTitleContainer>

			<PostContentContainer>
				<span>{text}</span>
			</PostContentContainer>

			<VotesContainer>
				<ButtonContainer>
					<FontAwesomeIcon icon={faHeart} />
					<span>Like</span>
					<span>{votes.upvote}</span>
				</ButtonContainer>
				<ButtonContainer>
					<FontAwesomeIcon icon={faHeartBroken} />
					<span>Dislike</span>
					<span>{votes.downvote}</span>
				</ButtonContainer>
			</VotesContainer>
		</PostContainer>
	) : (
		<CreateNewPost
			isEdit={true}
			data={{ title, text }}
			postEdit={postEdit}
			setPostEdit={setPostEdit}
			postId={postId}
		/>
	)
}

export default Post
