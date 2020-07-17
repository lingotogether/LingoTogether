import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../actions/'
import { Menu, MenuItem } from '@material-ui/core'
import '../../style/profile.scss'

const CustomMenuItem = ({ title, to, onClick }) => {
	return (
		<MenuItem onClick={onClick}>
			<Link 
				to={to} 
				className="profile-link"
			>
				{ title }
			</Link>
		</MenuItem>
	)
}

const Profile = ({ CurrentUser, dispatch }) => {

	const [anchorEl, setAnchorEl] = useState(null)

	const handleLogout = () => {
		console.log('here')
		dispatch(logoutUser())
	}

	const username = 
		CurrentUser && CurrentUser.memberData && CurrentUser.memberData.UserName
		? CurrentUser.memberData.UserName[0]
		: null

	return (
		<Fragment>
			<a 
				href="# " 
				className="profile-icon"
				onClick={event => setAnchorEl(event.currentTarget)}
			>
				<span className="username-initial">
				{ username }
				</span>
			</a>
			<Menu
				keepMounted
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
			>
				<CustomMenuItem title="Received beads" to="/received-beads"/>
				<CustomMenuItem title="Reward host" to="/reward-host"/>
				{
					/*
					TODO
						<CustomMenuItem title="Practice calender" to="/practice-calendar"/>
						<CustomMenuItem title="Monthly mission" to="/monthly-mission"/>
						<CustomMenuItem title="Settings" to="/" disabled={true}/>						
					*/
				}
				<CustomMenuItem 
					title="Logout"
					to="/"
					onClick={handleLogout}
				/>
			</Menu>
		</Fragment>
	)
}

export default Profile