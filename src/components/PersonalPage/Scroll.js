import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles'
import '../../style/VIPHome.scss'
import '../../style/CalendarMain.scss'
import '../../style/BeadsExchange.scss'

import { hendleDBactions } from '../../actions/handleDB';
import 'firebase/storage';


const cx = require('classnames')

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(0, 15)
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}))

const Scroll = (props) => {

	const {
		dispatch, CurrentUser, deviceIsMobile, 
		initALLMemberData, isAdminAccount, PrizeData, 
	} = props

	const classes = useStyles()
	
	//const totalPoint = CurrentUser.memberData.Bead

	// Function to add new prize into DB
	const AddAnnouncement = () => {

		const annoucementID = 'annoucementID';
		const annoucement = String(document.getElementById("annoucement").value)
		

		if (annoucement === '') {
			alert('Please input Annoucement!')
			return
		}				

		hendleDBactions('annoucement',
        annoucementID, {
				DataID: annoucementID, 
				Annoucement: annoucement, 				 
			}, 'SET', () => { alert('設定成功')}
		)
	}
	

	return (
		<Fragment>
			<div className={cx('VIPhome', { mobile: deviceIsMobile })}>
            <div className={classes.root}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<h1 className='profile-title'>
								Scroll
							</h1>
						</Grid>						
						{
							isAdminAccount ?
							(
								<Grid item xs={12}>
									<h2>Add new announcement</h2>									
									<TextField
										id="annoucement"
										label="Announcement"
										type="string"
										className={classes.textField}
										fullWidth
										margin="normal"
										margin="dense"
										variant="outlined"
									/>
                                    <button type="button" onClick={AddAnnouncement} className="button-addprize">
                                        <span>新增公告</span>
                                    </button>
								</Grid>                                
							) : (<></>)
						}						
					</Grid>
				</div>
			</div>
		</Fragment>
	)
}

const mapStateToProps = state => {
    return {
        CurrentUser: state.auth.CurrentUser,
        initALLMemberData: state.auth.initALLMemberData,
        isAdminAccount: state.auth.isAdminAccount,
        bookingData: state.auth.BookingDateData,
		deviceIsMobile: state.auth.deviceIsMobile,

		// New feature
		PrizeData: state.auth.PrizeData,
    }
}

export default connect(mapStateToProps)(Scroll)