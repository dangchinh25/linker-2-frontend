import React, { useState, useEffect } from "react"
import styled from "styled-components"
import HeaderNav from "../../components/shared/HeaderNav"
import axios from "axios"
import People from "./People"

const DiscoverContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 60%;
	margin: auto;
	box-sizing: border-box;
	margin-top: 20px;
	margin-bottom: 50px;
`
const PeopleListContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;
	margin-right: 30px;
`

function DiscoverPage() {
	const [peopleList, setPeopleList] = useState([])
	const thisUserId = JSON.parse(localStorage.getItem("userData")).userId

	useEffect(() => {
		const getPeople = async () => {
			try {
				const responseData = await axios.get(
					"http://localhost:5000/user/all"
				)
				setPeopleList(responseData.data)
			} catch (error) {
				console.log(error)
			}
		}
		getPeople()
	}, [])

	return (
		<React.Fragment>
			<HeaderNav />
			<DiscoverContainer>
				<PeopleListContainer>
					{peopleList
						.filter((person) => person._id !== thisUserId)
						.reverse()
						.map((people) => (
							<People
								key={people._id}
								id={people._id}
								name={people.name}
								age={people.age}
								gender={people.gender}
							/>
						))}
				</PeopleListContainer>
			</DiscoverContainer>
		</React.Fragment>
	)
}

export default DiscoverPage
