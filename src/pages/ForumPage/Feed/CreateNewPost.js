import React, { useState, useMemo } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt, faImages } from "@fortawesome/free-solid-svg-icons"
import { createEditor } from "slate"
import { Slate, Editable, withReact } from "slate-react"
import { tagOptions } from "../../Tag"
import Select from "react-select"
import axios from "axios"

const CreatePost = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid #8f9faa;
	padding: 12px 18px;
	border-radius: 15px;
	position: relative;

	span {
		font-size: 14px;
		line-height: 1.5rem;
		color: #7e7980;
	}

	.input-box {
		display: flex;
		width: 100%;
		justify-content: flex-start;
		align-items: flex-start;
		border-top: 1px solid #8f9faa;
		margin-top: 10px;
		padding-top: 10px;

		.create-post-icon {
			margin-top: 10px;
			font-size: 1.4rem;
			color: #8f9faa;
		}
	}
`

const StyledForm = styled.form`
	min-height: ${(props) => (props.expand ? "200px" : null)};
	max-height: 500px;
	margin-left: 15px;

	input {
		width: 90%;
		line-height: 1.8rem;
		border: none;
		outline: none;
		font-size: 20px;
		font-weight: 600;
		color: #7e7980;
		user-select: none;
	}

	svg {
		position: absolute;
		font-size: 1.3rem;
		bottom: 20px;
		right: 20px;
		color: #8f9faa;
	}

	.submit-post {
		position: absolute;
		padding: 5px 10px;
		bottom: 20px;
		left: 20px;
		border-radius: 10px;
		border: 1px solid #8f9faa;
		outline: none;
		cursor: pointer;
		transition: 0.1s all ease;
		color: #7e7980;

		&:hover {
			transform: scale(1.1);
		}

		&:disabled {
			cursor: default;
		}
	}
`

const StyledEditable = styled(Editable)`
	width: 530px;
	overflow-y: auto;
	height: auto;
	max-height: 400px;
	margin-bottom: ${(props) => (props.expand ? "40px" : null)};
`

const StyledSelect = styled(Select)`
	width: 80%;
	margin-bottom: 5px;
	color: #7e7980;

	.select__control--menu-is-open {
		border-color: #7e7980;
	}

	.css-1pahdxg-control {
		box-shadow: 0 0 1px #7e7980;
		border-color: #7e7980;
	}

	.css-1pahdxg-control:hover {
		border-color: #7e7980;
	}
`

function CreateNewPost({ isEdit, data, postEdit, setPostEdit, postId }) {
	const [isOpen, setIsOpen] = useState(false)
	const [post, setPost] = useState({
		title: !data ? "" : data.title,
		tags: [],
	})
	const editor = useMemo(() => withReact(createEditor()), [])
	// Add the initial value when setting up our state.
	const [value, setValue] = useState([
		{
			type: "paragraph",
			children: [{ text: !data ? "Add a paragraph" : data.text }],
		},
	])

	const onMouseHandler = () => {
		setIsOpen(!isOpen)
	}

	const onSubmitHandler = async (event) => {
		event.preventDefault()

		let submitData = {
			title: post.title,
			text: value[0].children[0].text,
			tags: post.tags.map((item) => item.value),
		}

		try {
			if (submitData.title === "" || submitData.text === "") {
				throw new Error("Invalid input field")
			}

			const responseData = await axios.post(
				"http://localhost:5000/post/new",
				submitData,
				{
					headers: {
						Authorization: `Bearer ${
							JSON.parse(localStorage.getItem("userData"))
								.token
						}`,
					},
				}
			)
			setPost({
				...post,
				title: "",
			})
			setValue([
				{
					type: "paragraph",
					children: [{ text: "Add description" }],
				},
			])
			window.location.reload(true)
		} catch (error) {
			alert(error)
		}
	}

	const onSubmitEditHandler = async (event) => {
		event.preventDefault()

		let submitData = {
			title: post.title,
			text: value[0].children[0].text,
		}
		setPostEdit(submitData)

		try {
			const responseData = await axios.patch(
				`http://localhost:5000/post/edit/${postId}`,
				submitData,
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

	return (
		<CreatePost>
			{!isEdit && <span>CREATE POST</span>}
			<div className="input-box">
				<FontAwesomeIcon
					icon={faPencilAlt}
					className="create-post-icon"
				/>
				<StyledForm expand="true">
					<input
						placeholder={!data ? "Post title" : data.title}
						value={post.title}
						onChange={(event) =>
							setPost({
								...post,
								title: event.target.value,
							})
						}
					/>
					{!isEdit && (
						<StyledSelect
							options={tagOptions}
							isMulti
							name="tags"
							className="basic-multi-select"
							classNamePrefix="select"
							onChange={(selected) => {
								setPost({ ...post, tags: selected })
							}}
						/>
					)}
					<Slate
						editor={editor}
						value={value}
						onChange={(value) => setValue(value)}
					>
						<StyledEditable expand />
					</Slate>
					{!isEdit ? (
						<button
							onClick={onSubmitHandler}
							className="submit-post"
						>
							Post
						</button>
					) : (
						<button
							className="submit-post"
							onClick={onSubmitEditHandler}
						>
							Done
						</button>
					)}
					<FontAwesomeIcon icon={faImages} />
				</StyledForm>
				{/* {isOpen ? (
					<StyledForm expand="true" onBlur={onMouseHandler}>
						{isOpen ? (
							<input
								placeholder="Post title"
								value={post.title}
								onChange={(event) =>
									setPost({
										...post,
										title: event.target.value,
									})
								}
							/>
						) : null}
						<Slate
							editor={editor}
							value={value}
							onChange={(value) => setValue(value)}
						>
							<StyledEditable expand />
						</Slate>
						<button
							onClick={onSubmitHandler}
							className="submit-post"
						>
							Post
						</button>
						<FontAwesomeIcon icon={faImages} />
					</StyledForm>
				) : (
					<StyledForm>
						<Slate
							editor={editor}
							value={value}
							onChange={(value) => setValue(value)}
						>
							<StyledEditable onFocus={onMouseHandler} />
						</Slate>
						<FontAwesomeIcon icon={faImages} />
					</StyledForm>
				)} */}
			</div>
		</CreatePost>
	)
}

export default CreateNewPost
