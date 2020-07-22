import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import '../../style/VIPHome.scss'
import '../../style/CalendarMain.scss'

import Pagination from '@material-ui/lab/Pagination';
import { CURRENT_USER, saveALLMemberData, saveBeadsRecordData, savePrizeData } from '../../actions'
import { hendleDBactions } from '../../actions/handleDB';
import * as firebase from 'firebase/app'
import 'firebase/storage';


const cx = require('classnames')

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(0, 15)
	}
}))

const BeadsExchange = (props) => {

	const {
		dispatch, CurrentUser, deviceIsMobile, 
		initALLMemberData, isAdminAccount, PrizeData, 
	} = props

	const classes = useStyles()
	
	const totalPoint = CurrentUser.memberData.Bead

	
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

	const resetPrizeData = newData => {
		dispatch(savePrizeData(newData))
	}

	const resetBeadsRecord = newData => {
		dispatch(saveBeadsRecordData(newData))
	}


	// Prize list
	let sortedPrizeData = PrizeData
	sortedPrizeData = sortedPrizeData.sort((a, b) => {
		return b.DataID - a.DataID
	})

	// Pagination of Prize list
	const totalPage = Math.ceil(sortedPrizeData.length / 5)
	const [page, setPage] = useState(1);

	let pagePrizeData = sortedPrizeData.slice( (page-1)*5, page*5 )
	const handleChange = (event, value) => {
		setPage(value);
		pagePrizeData = sortedPrizeData.slice( (page-1)*5, page*5-4 )
	};

	const ExchangePrize = value => {
		
		const prize = PrizeData.filter(data => {
			return data.DataID === value
		})[0]

		if (prize.Cost > CurrentUser.memberData.Bead) {
			alert('Your beads is not enough to exchange this prize.')
			return
		}

		hendleDBactions('prize',
			prize.DataID, {
				...prize, 
				LeftAmount: prize.LeftAmount - 1, 
				ExchangeUserID: [ ...prize.ExchangeUserID, CurrentUser.uid ], 
			}, 'UPDATE',
			hendleDBactions('prize', '', {}, '', resetPrizeData)
		)
           
		hendleDBactions('beadsRecord',
			dayjs().format('YYYYMMDD-HHmmss-') + 'exchangePrize-' + CurrentUser.uid, {
				Date: firebase.firestore.Timestamp.fromMillis(dayjs().valueOf()),
				Level: 3,
				Bead: (prize.Cost * -1),
				Title: "Prize exchange",
				Status: prize.Title,
				FromUserID: "system",
				ToUserID: CurrentUser.uid,
			}, 'SET',
			hendleDBactions('beadsRecord', '', {}, '', resetBeadsRecord)
		)

		hendleDBactions('memberCard',
			CurrentUser.memberData.DataID, {
				...CurrentUser.memberData, 
				Bead: CurrentUser.memberData.Bead - prize.Cost, 
			}, 'UPDATE',
			() => {
				hendleDBactions('memberCard', CurrentUser.uid, {}, 'getMemberCardByUserID', resetCurrentUserData)
				hendleDBactions('memberCard', '', {}, '', resetMemberData)
			}
		)

		alert('Please check your email for more details.')
	}


	// A function to add new prize into DB
	const AddPrize = () => {

		const prizeID = dayjs().format('YYYYMMDDHHmmss-') + CurrentUser.uid
		const prizeTitle = String(document.getElementById("prize-title").value)
		const prizeDescription = String(document.getElementById("prize-description").value)
		const prizeCost = Number(document.getElementById("prize-cost").value)
		const prizeAmount = Number(document.getElementById("prize-amount").value)
		const prizePhoto = document.getElementById("prize-photo").files[0]

		if (prizeTitle === '') {
			alert('Please input Title!')
			return
		}
		else if (prizeCost.isNaN) {
			alert('Invalid Cost!')
			return
		}
		else if (prizeAmount.isNaN) {
			alert('Invalid Amount!')
			return
		}

		if (prizePhoto !== undefined) {
			const storageRef = firebase.storage().ref().child(prizeID);
			storageRef.put(prizePhoto).then(function(snapshot) {
				console.log(snapshot)
			})
		}

		hendleDBactions('prize',
			prizeID, {
				DataID: prizeID, 
				Title: prizeTitle, 
				Description: prizeDescription, 
				hasPhoto: prizePhoto === undefined ? false : true, 
				Cost: prizeCost, 
				LeftAmount: prizeAmount, 
				TotalAmount: prizeAmount, 
				ExchangeUserID: [], 
			}, 'SET',
			hendleDBactions('prize', '', {}, '', resetPrizeData)
		)
	}

	return (
		<Fragment>
			<div className={cx('VIPhome', { mobile: deviceIsMobile })}>
				<div className={classes.root}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<h1 className='profile-title'>
								Beads Exchange
							</h1>
						</Grid>
						{
							isAdminAccount ?
							(<></>) :
							(
								<Grid item xs={12}>
									<span className='profile-content'>
										{ 'You have: '}{ isNaN(totalPoint) ? 0 : totalPoint }{ ' beads' }
									</span>
								</Grid>
							)
						}
						{
							isAdminAccount ?
							(
								<Grid item xs={12}>
									<h2>Add new prize</h2>
									<label>Title: </label>
									<input
										type="string"
										id="prize-title"
									/><br/>
									<label>Description: </label>
									<input
										type="string"
										id="prize-description"
									/><br/>
									<label>Cost: </label>
									<input
										type="number"
										id="prize-cost"
										defaultValue={100}
										min={0}
									/><br/>
									<label>Amount: </label>
									<input
										type="number"
										id="prize-amount"
										defaultValue={5}
										min={0}
									/><br/>
									<label>Photo: </label>
									<input
										type="file"
										id="prize-photo"
										accept="image/*"
									/><br/>
									<button type="button" onClick={AddPrize}>新增獎項</button>
								</Grid>
							) : (<></>)
						}
						<Grid item xs={12}>
							<h2>Prize list</h2>
							<table className='profile-table'>
								<tr className="row-title">
									<th>Image</th>
									<th>Title</th>
									<th>Description</th>
									<th>Cost</th>
									<th>Amount</th>
									<th>{ isAdminAccount ? 'Exchanged users list' : '' }</th>
								</tr>
								{
									pagePrizeData.length === 0 
									? '( No prize for exchange now )'
									: pagePrizeData.map(data => {
										return (
											<tr className="row">
												<td><img id={ data.DataID } src='' style={{ height: 50, margin: "0 auto" }}/></td>
												<td>{ data.Title }</td>
												<td>{ data.Description }</td>
												<td>{ data.Cost }</td>
												<td>
												{
													isAdminAccount ? 
													'Exchanged: ' + (data.TotalAmount - data.LeftAmount) :
													'Remain: ' + data.LeftAmount
												}<br/>{ 'Total: ' + data.TotalAmount }
												</td>
												<td>
												{
													isAdminAccount ?
													data.ExchangeUserID.map((user, index) => {
														const userMemberData = initALLMemberData.filter(memberData => {
															return memberData.uid === user
														})[0]
														return (
															<div>
															{
																(index + 1) + ' : ' +
																(userMemberData === undefined ? 'Unfound' : userMemberData.Email) 
															}<br/>
															</div>
														)
													}) :
													<button
														disabled={data.LeftAmount === 0 || data.ExchangeUserID.indexOf(CurrentUser.uid) != -1 }
														onClick={() => ExchangePrize(data.DataID)}
													>Exchange</button>
												}
												</td>
											</tr>
										)
									})
								}
								<script>
								{
									pagePrizeData.forEach(prize => {
										if (prize.hasPhoto) {
											const storageRef = firebase.storage().ref().child(prize.DataID);
											storageRef.getDownloadURL().then(function(url) {
												var img = document.getElementById(prize.DataID);
												img.src = url;
											}).catch(function(error) {
												// Handle any errors
											})
										}
										// else {
										// 	var img = document.getElementById(prize.DataID);
										// 	img.src = '';
										// }
									})
								}
								</script>
							</table>
						</Grid>

						{/* Pagination */}
						<div class="center">
							<Pagination count={totalPage} size="large" page={page} onChange={handleChange} />
						</div>
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

export default connect(mapStateToProps)(BeadsExchange)