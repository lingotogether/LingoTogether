import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import '../../style/VIPHome.scss'
import '../../style/CalendarMain.scss'

import { CURRENT_USER, saveALLMemberData } from '../../actions'
import { hendleDBactions } from '../../actions/handleDB';
import * as firebase from 'firebase/app'

const cx = require('classnames')

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(0, 15)
	}
}))

const RewardHost = (props) => {

	const {
		CurrentUser, deviceIsMobile, dispatch, initBookingData, initALLMemberData, 
	} = props

	const classes = useStyles()

	const classLvMap = [
		'-Ba-',
		'-In-',
		'-Adv-'
	]

	const resetCurrentUserData = newData => {
		const setCurrentUser = user => {
			console.log('setCurrentUser', user);
			return {
				type: CURRENT_USER,
				user,
			}
		}
        dispatch(setCurrentUser({
					...CurrentUser,
					memberData: {
						...CurrentUser.memberData,
						Bead: newData.Bead,
					}}))
    }

	const resetMemberData = newData => {
        dispatch(saveALLMemberData(newData))
    }

	let totalPoint = CurrentUser.memberData.Bead
	
	let lastBooking = { noData: true }
	for (let booking of initBookingData) {
		const bookingTime = 
			dayjs()
				.year(booking.date.substring(0, 4))
				.month(booking.date.substring(5, 7))
				.date(booking.date.substring(8, 10))
				.subtract(1, 'month')
                .hour(booking.time.substring(0, 2))
                .minute(booking.time.substring(2, 4))
                .second('0')
		if (bookingTime.isBefore(dayjs()) && booking.whoJoinEmail.indexOf(CurrentUser.email) > -1)
			lastBooking = booking
	}

	const rewardHost = () => {

		const bead = Number(document.getElementById("reward-bead").value)

		if (bead <= 0) {
			alert('You can\'t give beads which is less than or equal 0!')
			return
		}
		else if (bead > totalPoint) {
			alert('You have no that much beads!')
			return
		}

		async function givingBeads(bead) {

			const hostMemberData = initALLMemberData.filter(data => {
				return data.uid === lastBooking.CreateUserID
			})[0]

			hendleDBactions('memberCard',
				CurrentUser.memberData.DataID, {
					...CurrentUser.memberData,
					Bead: CurrentUser.memberData.Bead - bead,
				}, 'UPDATE',
			)

			hendleDBactions('memberCard',
				hostMemberData.DataID, {
					...hostMemberData,
					Bead: hostMemberData.Bead + bead,
				}, 'UPDATE',
			)

			hendleDBactions('beadsRecord',
				dayjs().format('YYYYMMDD-HHmmss') + classLvMap[lastBooking.classLv] + 'encouragement-' + hostMemberData.uid, {
					Date: firebase.firestore.Timestamp.fromMillis(dayjs().valueOf()),
					Level: lastBooking.classLv,
					Bead: bead,
					Title: "Being a host",
					Status: "Encouragement",
					FromUserID: CurrentUser.uid,
					ToUserID: lastBooking.CreateUserID,
				}, 'SET',
			)

			totalPoint = totalPoint - bead

			await new Promise(r => setTimeout(r, 2000));
			hendleDBactions('memberCard', '', {}, '', resetMemberData)
			hendleDBactions('memberCard', CurrentUser.uid, {}, 'getMemberCardByUserID', resetCurrentUserData)
		}

		if (window.confirm('Are you sure to give ' + bead + ' beads to ' + lastBooking.CreateUserName + '?'))
			givingBeads(bead)
	}

	console.log(lastBooking)

	// Didn't join any meeting before yet
	if (lastBooking.noData) {
		return (
			<Fragment>
				<div className={cx('VIPhome', { mobile: deviceIsMobile })}>
					<div className={classes.root}>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<h1 className='profile-title'>
									Reward Host
								</h1>
							</Grid>
							<Grid item xs={12}>
								<span className='profile-content'>
									{ 'You have: '}{ isNaN(totalPoint) ? 0 : totalPoint }{ ' beads' }
									{/* { dayjs(formatedDate).format('MM/DD/YYYY') } */}
								</span>
							</Grid>
							<Grid item xs={12}>

								<h2>You haven't join any meeting before yet</h2>
								<h4>Only participants of the meeting can encourage it's host.</h4>

							</Grid>
						</Grid>
					</div>
				</div>
			</Fragment>
		)
	}
	else {

		const bookingTime = 
			dayjs()
				.year(lastBooking.date.substring(0, 4))
				.month(lastBooking.date.substring(5, 7))
				.date(lastBooking.date.substring(8, 10))
				.subtract(1, 'month')
				.hour(lastBooking.time.substring(0, 2))
				.minute(lastBooking.time.substring(2, 4))

		return (
			<Fragment>
				<div className={cx('VIPhome', { mobile: deviceIsMobile })}>
					<div className={classes.root}>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<h1 className='profile-title'>
									Reward Host
								</h1>
							</Grid>
							<Grid item xs={12}>
								<span className='profile-content'>
									{ 'You have: '}{ isNaN(totalPoint) ? 0 : totalPoint }{ ' beads' }
								</span>
							</Grid>
							<Grid item xs={12}>

								<h2>Last meeting</h2>
								<div>Date & Time: { bookingTime.format('YYYY/MM/DD - hh:mm a') }</div>
								<div>Title: { lastBooking.Title }</div>
								<div>Host: { lastBooking.CreateUserName }</div>

								<h2>Encourage the host!</h2>
								<h4>Giving beads to host will cost you beads equally</h4>
								<label>Bead: </label>
								<input
									type="number"
									id="reward-bead"
									defaultValue={0}
									min={0}
									max={ isNaN(totalPoint) || totalPoint < 0 ? 0 : totalPoint }
								/>
								<button type="button" onClick={rewardHost}>打賞</button>

							</Grid>
						</Grid>
					</div>
				</div>
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
    return {
        CurrentUser: state.auth.CurrentUser,
        initALLMemberData: state.auth.initALLMemberData,
        initBookingData: state.auth.initBookingData,
		deviceIsMobile: state.auth.deviceIsMobile,
    }
}

export default connect(mapStateToProps)(RewardHost)