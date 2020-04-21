import React, { useState, useEffect, useCallback } from "react"
import HeaderNav from "../../components/shared/HeaderNav"
import styled from "styled-components"
import axios from "axios"
import Post from "./Feed/Post"
import Side from "./Side"
import CreateNewPost from "./Feed/CreateNewPost"

const ForumContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 60%;
	margin: auto;
	box-sizing: border-box;
	margin-top: 20px;
	margin-bottom: 50px;
`

const FeedContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 70%;
	margin-right: 30px;
`

function ForumPage({ query }) {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		const getPost = async () => {
			try {
				const responseData = await axios.get(
					"http://localhost:5000/post"
				)
				setPosts(responseData.data.posts)
			} catch (error) {
				console.log(error)
			}
		}
		getPost()
	}, [])

	return (
		<React.Fragment>
			<HeaderNav />
			<ForumContainer>
				<FeedContainer>
					<CreateNewPost />
					{posts.reverse().map((post) => (
						<Post
							key={post._id}
							title={post.title}
							text={post.text}
							votes={post.votes}
							userOwner={post.userOwner}
							postId={post._id}
							tags={post.tags}
						/>
					))}
				</FeedContainer>
				<Side />
			</ForumContainer>
		</React.Fragment>
	)
}

export default ForumPage
