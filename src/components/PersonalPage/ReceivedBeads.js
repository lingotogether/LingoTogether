import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { parseTime } from '../../utils/helpers'
import { cBoxController, BookingDateData } from '../../actions'
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
		CurrentUser, initBookingData, dispatch, cBoxShow, 
		bookingData, isAdminAccount, deviceIsMobile
	} = props

	const classes = useStyles()

	const classLvMap = [
		'Ba.',
		'In.',
		'Adv.'
	]

	const onClickDate = (e, book) => {
        dispatch(cBoxController(true))
        dispatch(BookingDateData(book))
	}

	const personalBooks = initBookingData.filter(book => {
		const isHost = book.CreateUserID === CurrentUser.uid
		const isParticipate = book.whoJoinEmail ? book.whoJoinEmail.includes(CurrentUser.email) : false
		return isHost || isParticipate
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
	                        {...bookingData}
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
							<span className='profile-content'>
								Gained beads: { GainedPoint } pts<br/>
								Host beads: { HostPoint } pts
							</span>
						</Grid>
						<Grid item xs={12}>
							<h2>Past records</h2>
							<div className='table'>
								<ul className='calendars_listmode'>
								{
									personalBooks.length === 0 
									? '( No result )'
									: personalBooks.map((book, index) => {
										let dd = book.date.split('/')
										const isHost = book.CreateUserID === CurrentUser.uid
										return (
						                    <li
						                        className='oneDate calendars_listmode'
						                        key={index}
						                        id={dd[2]}
						                        onClick={e => onClickDate(e, book)}
						                    >
						                        <div className="inner-li">
						                            <div className="li-left">
						                            	<span className='weekday'>
						                            	{ book.date }
						                            	</span>
						                            </div>
						                            <div className="li-middle">
						                                <div className="content">
						                                    <span>{parseTime(book.time)}</span>

						                                    <span>
						                                        [{isHost ? 'Host' : 'Participant'}] {book.Title}
						                                    </span>
						                                </div>
						                                <div
						                                    className={`btn-deco 
						                                    ${book.classLv === 0 ? 'green' : ''}  
						                                    ${book.classLv === 2 ? 'yellow' : ''}`}
						                                >
						                                    {classLvMap[book.classLv]}
						                                </div>
						                            </div>
						                        </div>
						                    </li>
										)
									})
								}
								</ul>
							</div>
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
        deviceIsMobile: state.auth.deviceIsMobile
    }
}

export default connect(mapStateToProps)(ReceivedBeads)