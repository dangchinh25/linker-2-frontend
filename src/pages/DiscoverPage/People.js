import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const PeopleContainer = styled.div`
	box-sizing: border-box;
	border: 1px solid black;
	border-radius: 15px;
	padding: 12px 18px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	width: 22%;
	background-color: #f7f6f6;
	cursor: pointer;
`
const StyledInfoRow = styled.div`
	width: 100%;
	text-align: center;
	background-color: #f7f6f6;
	color: #c6c4c4;
	margin: 0;

	img {
		width: 40%;
		height: auto;
		background-color: #f7f6f6;
		border-radius: 50%;
		border: 1px solid #c6c4c4;
		padding: 3px;
	}

	span {
		background-color: #f7f6f6;
		font-size: ${(props) => (props.name ? "18px" : null)};
	}

	a {
		text-decoration: none;
		color: ${(props) => props.name && "black"};

		&:hover {
			color: #f04c63;
		}
	}
`

function People({ id, name, age, gender }) {
	return (
		<PeopleContainer>
			<StyledInfoRow>
				<img src="logo192.png" />
			</StyledInfoRow>
			<StyledInfoRow name>
				<Link to={`/user/${id}`}>
					<span>{name}</span>
				</Link>
			</StyledInfoRow>
			<StyledInfoRow>
				<span>{gender}</span>
			</StyledInfoRow>
			<StyledInfoRow>
				<span>{age}</span>
			</StyledInfoRow>
		</PeopleContainer>
	)
}

export default People
