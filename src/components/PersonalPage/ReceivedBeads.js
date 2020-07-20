import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import '../../style/VIPHome.scss'
import '../../style/CalendarMain.scss'

// New Feature
import Pagination from '@material-ui/lab/Pagination';
// import { FaTrophy, FaMedal, FaAward } from "react-icons/fa"
// import { hendleDBactions } from '../../actions/handleDB';
// import * as firebase from 'firebase/app'

const cx = require('classnames')

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(0, 15)
	}
}))

const ReceivedBeads = (props) => {

	const {
		CurrentUser, deviceIsMobile, beadsRecordData, initALLMemberData, 
		// isAdminAccount, dispatch, cBoxShow, initBookingData, bookingData
	} = props

	const classes = useStyles()

	const classLvMap = [
		'Ba.',
		'In.',
		'Adv.'
	]


	// Most beads member data
	let mostBeadMemberData = initALLMemberData
	mostBeadMemberData = mostBeadMemberData.sort((a, b) => {
		return b.Bead - a.Bead
	}).slice(0, 3)
	// const place = [ <FaTrophy/>, <FaMedal/>, <FaAward/> ]


	// Bead records data
	let personalBeadsRecord = beadsRecordData.filter(record => {
		return record.FromUserID === CurrentUser.uid || record.ToUserID === CurrentUser.uid
	})
	personalBeadsRecord.sort((a, b) => {
		return b.Date - a.Date
	})

	const totalPoint = CurrentUser.memberData.Bead
	const formatedDate = CurrentUser.memberData.JoinDate ? CurrentUser.memberData.JoinDate.toDate() : null


	// Pagination data & functions
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
	const totalPage = Math.ceil(personalBeadsRecord.length / rowsPerPage)
	let showPersonalBeadsRecord = personalBeadsRecord.slice((page-1) * rowsPerPage, page * rowsPerPage);

	const handleChangePage = (event, value) => {
		setPage(value);
		showPersonalBeadsRecord = personalBeadsRecord.slice((page-1) * rowsPerPage, page * rowsPerPage)
	};
	// const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value)
    //     setPage(1)
	// }
	

	// Fix database
	// for (let member of initALLMemberData) {
	// 	hendleDBactions('memberCard', member.DataID, {
	// 		...member,
	// 		Bead: 0
	// 	}, 'UPDATE')
	// }

	// for (let book of initBookingData) {

	// 	const bookingDate = 
	// 		dayjs()
	// 			.year(book.date.substring(0, 4))
	// 			.month(book.date.substring(5, 7))
	// 			.date(book.date.substring(8, 10))
	// 			.subtract(1, 'month')

	// 	hendleDBactions(
	// 		'beadsRecord', 
	// 		bookingDate.format('YYYYMMDD-') + classLvMap[book.classLv] + book.CreateUserID,
	// 		{
	// 			Bead: 20,
	// 			Date: firebase.firestore.Timestamp.fromMillis(bookingDate.valueOf()),
	// 			FromUserID: "system",
	// 			Level: book.classLv,
	// 			Status: "Host punctual",
	// 			Title: "Being a host",
	// 			ToUserID: book.CreateUserID,
	// 		},
	// 		'SET',
	// 	)

	// 	for (let paticipant of book.whoJoinEmail) {

	// 		const UserID = initALLMemberData.filter(data => {
	// 			return data.Email === paticipant
	// 		}).map(data => data.uid)[0]
	// 		if (UserID === undefined) continue

	// 		hendleDBactions(
	// 			'beadsRecord', 
	// 			bookingDate.format('YYYYMMDD-') + classLvMap[book.classLv] + UserID,
	// 			{
	// 				Bead: 10,
	// 				Date: firebase.firestore.Timestamp.fromMillis(bookingDate.valueOf()),
	// 				FromUserID: "system",
	// 				Level: book.classLv,
	// 				Status: "Participant punctual",
	// 				Title: "Being a participant",
	// 				ToUserID: UserID,
	// 			},
	// 			'SET',
	// 		)
	// 	}
	// }

	// async function demo() {
	// 	for (let record of beadsRecordData) {
	// 		const repairBead = DATA => {
	// 			hendleDBactions('memberCard', DATA.Email,
	// 				{
	// 					...DATA,
	// 					Bead: DATA.Bead + record.Bead
	// 				},
	// 				'UPDATE'
	// 			)
	// 		}
	// 		hendleDBactions('memberCard', record.ToUserID, {}, 'getMemberCardByUserID', repairBead)
	// 		await new Promise(r => setTimeout(r, 2000));
	// 	}
	// }

	// demo()


	return (
		<Fragment>
			<div className={cx('VIPhome', { mobile: deviceIsMobile })}>
				<div className={classes.root}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<h1 className='profile-title'>
								Received Beads
							</h1>
							<span className='profile-content'>
								<span style={{ fontSize: 30 }}>
									{ isNaN(totalPoint) ? 0 : totalPoint }
								</span>
								{' beads have received since '}
								{ dayjs(formatedDate).format('MM/DD/YYYY') }
							</span>
						</Grid>

						<Grid item xs={12}>
							<h2>Bead ranking</h2>
							<div className='img-container' style={{ width: 600, marginTop: 50 }}>
								<img src={require('../../img/ranking.png')} style={{ width: "100%" }}/>
								<div className='fisrt-place-user'>
									<span style={{ fontSize: 26 }}>{ mostBeadMemberData[0].UserName }</span><br/>
									<span style={{ fontSize: 20 }}>({ mostBeadMemberData[0].Email.slice(0, mostBeadMemberData[0].Email.indexOf("@")) })</span>
								</div>
								<div className='fisrt-place-bead'><span style={{ fontSize: 30 }}>{ mostBeadMemberData[0].Bead }</span></div>
								<div className='second-place-user'>
									<span style={{ fontSize: 26 }}>{ mostBeadMemberData[1].UserName }</span><br/>
									<span style={{ fontSize: 20 }}>({ mostBeadMemberData[1].Email.slice(0, mostBeadMemberData[1].Email.indexOf("@")) })</span>
								</div>
								<div className='second-place-bead'><span style={{ fontSize: 30 }}>{ mostBeadMemberData[1].Bead }</span></div>
								<div className='third-place-user'>
									<span style={{ fontSize: 26 }}>{ mostBeadMemberData[2].UserName }</span><br/>
									<span style={{ fontSize: 20 }}>({ mostBeadMemberData[2].Email.slice(0, mostBeadMemberData[2].Email.indexOf("@")) })</span>
								</div>
								<div className='third-place-bead'><span style={{ fontSize: 30 }}>{ mostBeadMemberData[2].Bead }</span></div>
							</div>
						</Grid>

						<Grid item xs={12}>
							<h2>Past records</h2>
							<table className='profile-table'>
								<tr className="row-title">
									<th>Date</th>
									<th>Bead</th>
									<th>Level</th>
									<th>Title</th>
									<th>Status</th>
									<th>From</th>
								</tr>
								{
									showPersonalBeadsRecord.length === 0 
									? '( No record )'
									: showPersonalBeadsRecord.map(record => {

										const recordDate = record.Date.toDate()
										const FromUser = record.FromUserID === "system" ? "system" : initALLMemberData.filter(data => {
											return data.uid === record.FromUserID
										}).map(data => data['UserName'])[0]

										return (
											<tr className="row">
												<td>
													{ dayjs(recordDate).format('MM/DD/YYYY') }
													<br/>
													{ dayjs(recordDate).format('hh:mm a') }
												</td>
												<td>{ record.Bead }</td>
												<td>
												{
													record.Level === 3 ? '' : 
													<div
														className={`btn-deco 
														${record.Level === 0 ? 'green' : ''}  
														${record.Level === 2 ? 'yellow' : ''}`}
													>{ classLvMap[record.Level] }</div>
												}
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

						<Grid item xs={12}>
							<div>
								<Pagination
									size="large"
									count={ totalPage }
									page={ page }
									onChange={ handleChangePage }
									style={{ alignContent: "center" }}
								/>
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
        // isAuthenticated: state.auth.isAuthenticated,
        // isVerifying: state.auth.isVerifying,
        CurrentUser: state.auth.CurrentUser,
        initALLMemberData: state.auth.initALLMemberData,
        // isAdminAccount: state.auth.isAdminAccount,
        // initBookingData: state.auth.initBookingData,
        // cBoxShow: state.auth.cBoxShow,
        bookingData: state.auth.BookingDateData,
		deviceIsMobile: state.auth.deviceIsMobile,

		// New feature
		beadsRecordData: state.auth.beadsRecordData,
    }
}

export default connect(mapStateToProps)(ReceivedBeads)