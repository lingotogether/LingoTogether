import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { parseTime } from '../../utils/helpers'
import { cBoxController, BookingDateData, createBeadsRecordData } from '../../actions'
import ClassForm from '../ClassForm'
import '../../style/VIPHome.scss'
import '../../style/CalendarMain.scss'

const cx = require('classnames')

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(0, 15)
	}
}))

const ReceivedBeads = (props) => {

	const {
		CurrentUser, dispatch, cBoxShow, beadsRecordData, initALLMemberData, 
		isAdminAccount, deviceIsMobile, initBookingData // , bookingData
	} = props

	const classes = useStyles()

	const classLvMap = [
		'Ba.',
		'In.',
		'Adv.'
	]

	const onClickDate = (e, book) => {
        dispatch(cBoxController(true))
        // dispatch(BookingDateData(book))
	}

	// for (let book of initBookingData) {

	// 	const Email = initALLMemberData.filter(data => {
	// 		return data['UserName'] === book['CreateUserName']
	// 	}).map(data => data['Email'])[0]

	// 	const bookingDate = dayjs(book.date + book.time, "YYYY/MM/DDhhmm")

	// 	createBeadsRecordData({
	// 		Bead: 20,
	// 		Date: bookingDate.unix(),
	// 		FromEmail: "system",
	// 		Level: book.classLv,
	// 		Status: "Host punctual",
	// 		Title: "Being a host",
	// 		ToEmail: Email,
	// 	})
	// }

	const personalBeadsRecord = beadsRecordData.filter(record => {
		return record.FromEmail === CurrentUser.email || record.ToEmail === CurrentUser.email
	})

	const {
		GainedPoint,
		HostPoint,
		JoinDate
	} = CurrentUser.memberData
	const totalPoint = GainedPoint + HostPoint
	const formatedDate = JoinDate ? JoinDate.toDate() : null

	return (
		<Fragment>
			<div className={cx('VIPhome', { mobile: deviceIsMobile })}>
	            <div
	                className={cx('mask', { cardActive: cBoxShow })}
	                onClick={() => {
	                    dispatch(cBoxController(false))
	                }}
	            ></div>
	            <div className="classForm">
	                {cBoxShow ? (
	                    <ClassForm
	                        // {...bookingData}
	                        CurrentUser={CurrentUser}
	                        {...props}
	                        isAdminAccount={isAdminAccount}
	                    />
	                ) : null}
	            </div>
				<div className={classes.root}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<h1 className='profile-title'>
								Received Beads
							</h1>
						</Grid>
						<Grid item xs={12}>
							<span className='profile-content'>
								{ isNaN(totalPoint) ? 0 : totalPoint } {' '}
								beads have received since {' '}
								{ dayjs(formatedDate).format('MM/DD/YYYY') }
							</span>
						</Grid>
						<Grid item xs={12}>
							<h2>Past records</h2>
							<table className='profile-table'>
								<tr className="row-title">
									<th>Date</th>
									<th>Level</th>
									<th>Title</th>
									<th>Status</th>
									<th>From</th>
								</tr>
								{
									personalBeadsRecord.length === 0 
									? '( No result )'
									: personalBeadsRecord.map((record, index) => {

										const recordDate = record.Date.toDate()
										const FromUser = initALLMemberData.filter(data => {
											return data['Email'] === record.FromEmail || data['Email'] === record.ToEmail
										}).map(data => data['UserName'])[0]

										return (
											<tr className="row">
												<td>
													{ dayjs(recordDate).format('MM/DD/YYYY') }
													<br/>
													{ dayjs(recordDate).format('hh:mm') }
												</td>
												<td>
													<div
														className={`btn-deco 
														${record.Level === 0 ? 'green' : ''}  
														${record.Level === 2 ? 'yellow' : ''}`}
													>
														{classLvMap[record.Level]}
													</div>
												</td>
												<td>{ record.Title }</td>
												<td>{ record.Status }</td>
												<td>{ FromUser }</td>
											</tr>
										)
									})
								}
							</table>
						</Grid>
					</Grid>
				</div>
			</div>
		</Fragment>
	)
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying,
        CurrentUser: state.auth.CurrentUser,
        initALLMemberData: state.auth.initALLMemberData,
        isAdminAccount: state.auth.isAdminAccount,
        initBookingData: state.auth.initBookingData,
        cBoxShow: state.auth.cBoxShow,
        bookingData: state.auth.BookingDateData,
		deviceIsMobile: state.auth.deviceIsMobile,

		// New feature
		beadsRecordData: state.auth.beadsRecordData,
    }
}

export default connect(mapStateToProps)(ReceivedBeads)