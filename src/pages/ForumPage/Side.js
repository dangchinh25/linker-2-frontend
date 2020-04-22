import React from "react"
import styled from "styled-components"
import { tagOptions } from "../Tag"
import { Link } from "react-router-dom"

const SideContainer = styled.div`
	display: flex;
	width: 30%;
	flex-direction: column;
`

const SideBoxContainer = styled.div`
	border: 1px solid #7e7980;
	border-radius: 20px;
	padding: 15px 15px;
	color: #7e7980;
	background: #f7f6f6;
`

const BoxTitle = styled.div`
	display: flex;
	margin-bottom: 8px;
	background: #f7f6f6;

	span {
		font-size: 20px;
		background: #f7f6f6;
	}
`

const BoxContent = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	background: #f7f6f6;
`

const StyledLink = styled.a`
	color: #7e7980;
	font-size: 14px;
	padding: 5px 7px;
	border-radius: 5px;
	border: 1px solid #7e7980;
	font-weight: 500;
	margin-top: 4px;
	margin-right: 4px;
	line-height: 1.1;
	display: inline-block;
	text-decoration: none;
	background: #f7f6f6;

	&:hover {
		background-color: #f04c63;
		color: #f4f7f6;
	}
`

function Side() {
	return (
		<SideContainer>
			<SideBoxContainer>
				<BoxTitle>
					<span>Top tags</span>
				</BoxTitle>
				<BoxContent>
					{tagOptions.map((item) => (
						<StyledLink href="/">{item.value}</StyledLink>
					))}
				</BoxContent>
			</SideBoxContainer>
		</SideContainer>
	)
}

export default Side
