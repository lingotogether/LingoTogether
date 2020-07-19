import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import '../../style/VIPHome.scss'
import '../../style/CalendarMain.scss'

// New Feature
import {Line} from 'react-chartjs-2';
import { FaTrophy, FaMedal, FaAward } from "react-icons/fa"

const cx = require('classnames')

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(0, 15)
	}
}))

const PracticeCalendar = (props) => {

	const {
		CurrentUser, deviceIsMobile, beadsRecordData, initALLMemberData, 
	} = props

	const classes = useStyles()


	// Most beads member data
	let mostBeadMemberData = initALLMemberData
	mostBeadMemberData = mostBeadMemberData.sort((a, b) => {
		return b.Bead - a.Bead
	}).slice(0, 3)
	const place = [ <FaTrophy/>, <FaMedal/>, <FaAward/> ]


	// Chart data
	const START_DATE = '2020-02-01'
	const totalMonthAmount = dayjs().month() - dayjs(START_DATE).month() + 1
	var monthPractice = Array(totalMonthAmount).fill(0)
	var monthHost = Array(totalMonthAmount).fill(0)
	var monthParticipant = Array(totalMonthAmount).fill(0)
	var monthString = Array(totalMonthAmount).fill(0).map((item, index) => {
		return dayjs(START_DATE).add(index, 'month').format('YYYY-MM')
	})

	beadsRecordData.forEach(record => {
		if (record.ToUserID === CurrentUser.uid && record.FromUserID === "system") {
			const monthIndex = dayjs(record.Date.toMillis()).month() - dayjs(START_DATE).month()
			if (record.Status === "Host punctual" || record.Status === "Host tardy") {
				monthPractice[monthIndex] += 1
				monthHost[monthIndex] += 1
			}
			else if (record.Status === "Participant punctual" || record.Status === "Participant tardy") {
				monthPractice[monthIndex] += 1
				monthParticipant[monthIndex] += 1
			}
		}
	})

	const totalPracticeColor = '#1d9e82'
	const hostColor = '#a5cf69'
	const participantColor = '#6ce2ff'

	const data =
	{
		labels: monthString,
		datasets: [
			{
				label: 'Total practice times',
				data: monthPractice,
				backgroundColor: "rgba(0, 0, 0, 0)",
				borderColor: totalPracticeColor,
				pointHoverRadius: 5,
				lineTension: 0.2,
			}, {
				label: 'Host times',
				data: monthHost,
				backgroundColor: "rgba(0, 0, 0, 0)",
				borderColor: hostColor,
				pointHoverRadius: 5,
				lineTension: 0.2,
			}, {
				label: 'Participant times',
				data: monthParticipant,
				backgroundColor: "rgba(0, 0, 0, 0)",
				borderColor: participantColor,
				pointHoverRadius: 5,
				lineTension: 0.2,
			},
		]
	}


	// Total overview data
	const joinedDay = dayjs().diff(dayjs(CurrentUser.memberData.JoinDate.toMillis()), 'day')
	const reducer = (accumulator, currentValue) => accumulator + currentValue;
	const totalHostTime = monthHost.reduce(reducer)
	const totalParticipantTime = monthParticipant.reduce(reducer)


	return (
		<Fragment>
			<div className={cx('VIPhome', { mobile: deviceIsMobile })}>
				<div className={classes.root}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<h1 className='profile-title'>
								Practice Calendar
							</h1>
						</Grid>
						<Grid item xs={deviceIsMobile ? 12 : 6}>
							<h2>Total overview</h2>
							<table className='profile-table'>
								<tr className="row-title">
									<th style={{ fontSize: 39, width: "33%", }}>{ joinedDay }</th>
									<th style={{ fontSize: 39, width: "33%", }}>{ totalHostTime }</th>
									<th style={{ fontSize: 39, width: "33%", }}>{ totalParticipantTime }</th>
								</tr>
								<tr className="row">
									<td>days at<br/>Lingotogether</td>
									<td>times<br/>host</td>
									<td>discussions<br/>joined</td>
								</tr>
							</table>
						</Grid>
						<Grid item xs={deviceIsMobile ? 12 : 6}>
							<h2>Bead ranking</h2>
							<table className='profile-table'>
								<tr className="row-title">
									<th></th>
									<th>UserName</th>
									<th>Email</th>
									<th>Bead</th>
								</tr>
								{
									mostBeadMemberData.length === 0 
									? '( No member )'
									: mostBeadMemberData.map((record, index) => {
										return (
											<tr className="row">
												<td>{ place[index] }</td>
												<td>{ record.UserName }</td>
												<td>{ record.Email }</td>
												<td>{ record.Bead }</td>
											</tr>
										)
									})
								}
							</table>
						</Grid>
						<Grid item xs={12}>
							<h2>Practice frequency</h2>
							<div style={{
								position: "relative",
								height: deviceIsMobile ? "30vh" : "50vh",
							}}>
								<Line
									data={ data }
									options={
										{
											maintainAspectRatio: false,
											responsive: true, 
											scales: {
												yAxes: [{
													ticks: {
														beginAtZero: true,
														stepSize: 5
													}
												}]
											}
										}
									}
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
        CurrentUser: state.auth.CurrentUser,
        initALLMemberData: state.auth.initALLMemberData,
		deviceIsMobile: state.auth.deviceIsMobile,

		// New feature
		beadsRecordData: state.auth.beadsRecordData,
    }
}

export default connect(mapStateToProps)(PracticeCalendar)