import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, MenuItem } from '@material-ui/core'
import '../../style/profile.css'


const CustomMenuItem = ({ title, to }) => {
	return (
		<MenuItem>
			<Link to={to} className="profile-link">
				{ title }
			</Link>
		</MenuItem>
	)
}

const Profile = ({ CurrentUser }) => {

	const [anchorEl, setAnchorEl] = useState(null)

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
			    anchorOrigin={{
			      vertical: 'bottom',
			      horizontal: 'center',
			    }}
			    transformOrigin={{
			      vertical: 'top',
			      horizontal: 'center',
			    }}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
			>
				<CustomMenuItem title="Received beads" to="/"/>
				<CustomMenuItem title="Monthly mission" to="/"/>
				<CustomMenuItem title="Practice calender" to="/"/>
				<CustomMenuItem title="Settings" to="/"/>
				<CustomMenuItem title="Logout" to="/"/>
			</Menu>
		</Fragment>
	)
}

export default Profile