import React from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import { 
	Grid,
	Table, 
	TableBody, 
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(0, 3)
	},
	tableHeader: {
		fontWeight: 'bold'
	}
}))

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const ReceivedBeads = ({ CurrentUser, initBookingData }) => {

	const classes = useStyles()

	const classLvMap = [
		'Ba.',
		'In.',
		'Adv.'
	]

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
					<TableContainer>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell className={classes.tableHeader}>Date</TableCell>
									<TableCell className={classes.tableHeader} align="right">Level</TableCell>
									<TableCell className={classes.tableHeader} align="right">Title</TableCell>
									<TableCell className={classes.tableHeader} align="right">Status</TableCell>
									<TableCell className={classes.tableHeader} align="right">Beads</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									personalBooks.map((book, index) => {
										const isHost = book.CreateUserID === CurrentUser.uid
										return (
											<TableRow key={index}>
												<TableCell component="th" scope="row">
												{ book.date }
												</TableCell>
												<TableCell align="right">{classLvMap[book.classLv]}</TableCell>
												<TableCell align="right">{book.Title}</TableCell>
												<TableCell align="right">{isHost ? 'Host' : 'Participant'}</TableCell>
												<TableCell align="right">{isHost ? '+2' : '+1'}</TableCell>
											</TableRow>
										)
									})
								}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</div>
	)
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying,
        CurrentUser: state.auth.CurrentUser,
        initALLMemberData: state.auth.initALLMemberData,
        isAdminAccount: state.auth.isAdminAccount,
        initBookingData: state.auth.initBookingData
    }
}

export default connect(mapStateToProps)(ReceivedBeads)