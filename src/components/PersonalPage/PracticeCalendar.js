import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import '../../style/VIPHome.scss'
import '../../style/CalendarMain.scss'

// New Feature
import {Line} from 'react-chartjs-2';

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


	// Chart data
	const DEFAULT_START_DATE = dayjs('2020-01-01')
	const yearList = Array(dayjs().year() - DEFAULT_START_DATE.year() + 10).fill(0).map((item, index) => {
		return DEFAULT_START_DATE.add(index, 'year').format('YYYY')
	})
	const monthList = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
	const [startYear, setStartYear] = useState('2020')
	const [startMonth, setStartMonth] = useState('02')
	const [endYear, setEndYear] = useState(dayjs().format('YYYY'))
	const [endMonth, setEndMonth] = useState(dayjs().format('MM'))
	const startDate = dayjs(startYear + '-' + startMonth + '-01').hour(0).minute(0).second(0)
	const endDate = dayjs(endYear + '-' + endMonth + '-01').hour(0).minute(0).second(0)

	const totalMonthAmount = 
		endDate.isAfter(dayjs()) ?
		endDate.diff(DEFAULT_START_DATE, 'month') + 1 :
		dayjs().diff(DEFAULT_START_DATE, 'month') + 1
	const displayMonthStartIndex = startDate.diff(DEFAULT_START_DATE, 'month')
	const displayMonthEndIndex = endDate.diff(DEFAULT_START_DATE, 'month')

	// console.log(displayMonthEndIndex)

	var monthPractice = Array(totalMonthAmount).fill(0)
	var monthHost = Array(totalMonthAmount).fill(0)
	var monthParticipant = Array(totalMonthAmount).fill(0)
	var monthString = Array(totalMonthAmount).fill(0).map((item, index) => {
		return DEFAULT_START_DATE.add(index, 'month').format('YYYY-MM')
	})

	beadsRecordData.forEach(record => {
		if (record.ToUserID === CurrentUser.uid && record.FromUserID === "system") {			
			const monthIndex = dayjs(record.Date.toMillis()).diff('2020-01-01', 'month');			
			if (record.Status === "Host punctual" || record.Status === "Host tardy" || record.Status === "Host tardy & Return deposit") {
				monthPractice[monthIndex] += 1
				monthHost[monthIndex] += 1
			}
			else if (record.Status === "Participant punctual" || record.Status === "Participant tardy" || record.Status === "Participant tardy & Return deposit") {
				monthPractice[monthIndex] += 1
				monthParticipant[monthIndex] += 1
			}
		}
	})

	const totalPracticeColor = '#27B4C7'
	const hostColor = '#F78185'
	const participantColor = '#F5DF67'

	const data =
	{
		labels: monthString.slice(displayMonthStartIndex, displayMonthEndIndex + 1),
		datasets: [
			{
				label: 'Total practice times',
				data: monthPractice.slice(displayMonthStartIndex, displayMonthEndIndex + 1),
				backgroundColor: "rgba(0, 0, 0, 0)",
				borderColor: totalPracticeColor,
				pointHoverRadius: 5,
				lineTension: 0.2,
			}, {
				label: 'Host times',
				data: monthHost.slice(displayMonthStartIndex, displayMonthEndIndex + 1),
				backgroundColor: "rgba(0, 0, 0, 0)",
				borderColor: hostColor,
				pointHoverRadius: 5,
				lineTension: 0.2,
			}, {
				label: 'Participant times',
				data: monthParticipant.slice(displayMonthStartIndex, displayMonthEndIndex + 1),
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


	// Level
	const totalPractice = totalHostTime + totalParticipantTime
	const practiceTimeNeeds = [ 30, 70, 110, 150, 250 ]
	let level = 1
	if (totalPractice <= practiceTimeNeeds[0]) level = 1
	else if (totalPractice <= practiceTimeNeeds[1]) level = 2
	else if (totalPractice <= practiceTimeNeeds[2]) level = 3
	else if (totalPractice <= practiceTimeNeeds[3]) level = 4
	else level = 5


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
						<Grid item xs={deviceIsMobile ? 12 : 8}>
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
							<h2>Frequency</h2>
							<h4>{ 'From ' }
								<select
									defaultValue={ startMonth }
									onChange={ e => setStartMonth(e.target.value) }
									style={{
										border: "1px solid #ccc",
  										borderRadius: "5px",
									}}
								>
								{
									monthList.map((monthText, index) => {
										let value = (index + 1).toString()
										if (value.length === 1) value = '0' + value
										return (
											<option key={ index } value={ value }>
												{ monthText }
											</option>
										)
									})
								}
								</select>
								{ '/' }
								<select
									defaultValue={ startYear }
									onChange={ e => setStartYear(e.target.value) }
									style={{
										border: "1px solid #ccc",
  										borderRadius: "5px",
									}}
								>
								{
									yearList.map((monthText, index) => {
										return (
											<option key={ index } value={ monthText }>
												{ monthText }
											</option>
										)
									})
								}
								</select>
								{ ' to ' }
								<select
									defaultValue={ endMonth }
									onChange={ e => setEndMonth(e.target.value) }
									style={{
										border: "1px solid #ccc",
  										borderRadius: "5px",
									}}
								>
								{
									monthList.map((monthText, index) => {
										let value = (index + 1).toString()
										if (value.length === 1) value = '0' + value
										return (
											<option key={ index } value={ value }>
												{ monthText }
											</option>
										)
									})
								}
								</select>
								{ '/' }
								<select
									defaultValue={ endYear }
									onChange={ e => setEndYear(e.target.value) }
									style={{
										border: "1px solid #ccc",
  										borderRadius: "5px",
									}}
								>
								{
									yearList.map((monthText, index) => {
										return (
											<option key={ index } value={ monthText }>
												{ monthText }
											</option>
										)
									})
								}
								</select>
							</h4>
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
						<Grid item xs={deviceIsMobile ? 0 : 1}></Grid>
						<Grid item xs={deviceIsMobile ? 12 : 3}>
							{/* <h2>Level</h2>
							<h4>{ 'You are now: Level ' + level }</h4>
                            <img
								width={ 150 }
								src={require('../../img/level-' + level + '.png')}
								alt={ 'level-' + level }
							/> */}

							<h2>Level list</h2>
							<h4>{ 'You are now: Level ' + level }</h4>
							<table className='profile-table'>
								<tr className="row-title">
									<th></th>
									<th>Level</th>
									<th>Practice<br/>times</th>
								</tr>
								{
									practiceTimeNeeds.map((item, i) => {
										let practiceTimeNeedsString = ''
										if (i === 0) practiceTimeNeedsString = '0 ~ ' + practiceTimeNeeds[i]
										else if (i === 4) practiceTimeNeedsString = (practiceTimeNeeds[i-1] + 1) + ' ~'
										else practiceTimeNeedsString = (practiceTimeNeeds[i-1] + 1) + ' ~ ' + practiceTimeNeeds[i]
										return (
											<tr className={i === (level-1) ? 'row highlight' : 'row'}>
												<td>
													<div style={{ padding: "3px" }}>
														<img
															width={ 50 }
															style={{ margin: "0px auto" }}
															src={require('../../img/level-' + (i + 1) + '.png')}
															alt={ 'level-' + (i + 1) }
														/>
													</div>
												</td>
												<td>{ (i + 1) }</td>
												<td>{ practiceTimeNeedsString }</td>
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
        CurrentUser: state.auth.CurrentUser,
        initALLMemberData: state.auth.initALLMemberData,
		deviceIsMobile: state.auth.deviceIsMobile,

		// New feature
		beadsRecordData: state.auth.beadsRecordData,
    }
}

export default connect(mapStateToProps)(PracticeCalendar)