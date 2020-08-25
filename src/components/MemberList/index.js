import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Clipboard from 'react-clipboard.js'
import { 
    Table, 
    TableBody, 
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination 
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import { hendleDBactions } from '../../actions/handleDB'
import { db } from '../../firebase/firebase'
import { saveALLMemberData } from '../../actions'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        margin: 'auto'
    },
    container: {
        maxHeight: 600,
        marginTop: '5%'
    },
    tableHeader: {
        fontWeight: 'bold'
    }
}))

const MemberList = (props) => {

    const classes = useStyles()

    const { dispatch, initALLMemberData, isAdminAccount } = props

    const [isPass, setIsPass] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    useEffect(() => {
        resetALLMemberData()
    }, [isPass])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const reviseDate = date => {
        if (date) {
            const theD = new Date(date.seconds * 1000)
            const YYYY = theD.getFullYear()
            const MM = theD.getMonth() + 1
            const DD = theD.getDate()
            return YYYY + '/' + MM + '/' + DD
        }
    }

    const deleteMember = e => {
        const dom = e.target
        const Email = dom.getAttribute('data-email')
        // 改為保留資料 但更改狀態
        if (window.confirm('Are you sure you want to permanently delete this member?')) {
            hendleDBactions(
                'memberCard',
                Email,
                {
                    Status: 9,
                },
                'UPDATE'
            )
            setTimeout(function() {
                resetALLMemberData()
            }, 1000)
        } else {
            return
        }
    }

    const resetALLMemberData = () => {
        db.collection('memberCard')
            .get()
            .then(snapshot => {
                let initALLMemberData = []
                snapshot.forEach(doc => {
                    const booked = doc.data() //obj
                    initALLMemberData.push({ ...booked, DataID: doc.id })
                })

                dispatch(saveALLMemberData(initALLMemberData))
            })
    }

    if (!isAdminAccount) {
        // non AdminAccount out
        return <Redirect to="/TopHome" />
    } else {
        return (
            <div className='slider-container'>
                <div className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader size='small' aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHeader}>刪除</TableCell>
                                    <TableCell className={classes.tableHeader}>lv.</TableCell>
                                    <TableCell className={classes.tableHeader}>Name</TableCell>
                                    <TableCell className={classes.tableHeader}>Email</TableCell>
                                    <TableCell className={classes.tableHeader}>Bead</TableCell>
                                    <TableCell className={classes.tableHeader}>LineID</TableCell>
                                    <TableCell className={classes.tableHeader}>SkypeID</TableCell>
                                    <TableCell className={classes.tableHeader}>本月</TableCell>
                                    <TableCell className={classes.tableHeader}>主持</TableCell>
                                    <TableCell className={classes.tableHeader}>Join Date</TableCell>
                                    <TableCell className={classes.tableHeader}>狀態</TableCell>
                                    <TableCell className={classes.tableHeader}>Where</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                initALLMemberData &&
                                initALLMemberData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(function(item, i) {
                                    if (item.Email && item.Status !== 9) {
                                        const {
                                            Level,
                                            UserName,
                                            Email,
                                            Bead,
                                            LineID,
                                            SkypeID,
                                            GainedPoint,
                                            HostPoint,
                                            JoinDate,
                                            Status,
                                            InfoSource,
                                        } = item
                                        return (
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <DeleteOutlinedIcon
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={e => {
                                                            deleteMember(e)
                                                        }}
                                                        data-email={Email} 
                                                    />
                                                </TableCell>
                                                <TableCell>{ Level }</TableCell>
                                                <TableCell>{ UserName }</TableCell>
                                                <TableCell>{ Email }</TableCell>
                                                <TableCell>{ Bead }</TableCell>
                                                <TableCell>{ LineID }</TableCell>
                                                <TableCell>{ SkypeID }</TableCell>
                                                <TableCell>{ GainedPoint }</TableCell>
                                                <TableCell>{ HostPoint }</TableCell>
                                                <TableCell>{ reviseDate(JoinDate) }</TableCell>
                                                <TableCell>{ Status }</TableCell>
                                                <TableCell>{ InfoSource || '(none)' }</TableCell>
                                            </TableRow>
                                        )
                                    }
                                })
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, initALLMemberData.length]}
                        component="div"
                        count={initALLMemberData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </div>
                <div className="memberListMemo">
                    <ul>
                        <li>會員Status: 0-新註冊 2-正常  5-前月點數未滿  9-刪除</li>
                    </ul>
                </div>
            </div>
            /*
            <div className="slider-container">
                <div className="memberList">
                    <ul>
                        <li className="th">
                            <div className="small delete" key="delete">
                                刪除
                            </div>
                            <div className="small">lv.</div>
                            <div>Name</div>
                            <div>Email</div>
                            <div>LineID</div>
                            <div>SkypeID</div>
                            <div className="small">本月</div>
                            <div className="small">主持</div>
                            <div>Join Date</div>
                            <div className="small">狀態</div>
                            <div className="small">面試</div>
                        </li>
                        {initALLMemberData &&
                            initALLMemberData.map(function(item, i) {
                                if (item.Email && item.Status !== 9) {
                                    const {
                                        Level,
                                        UserName,
                                        Email,
                                        LineID,
                                        SkypeID,
                                        GainedPoint,
                                        HostPoint,
                                        JoinDate,
                                        Status,
                                        isPassed,
                                    } = item
                                    const arr = [
                                        Level,
                                        UserName,
                                        Email,
                                        LineID,
                                        SkypeID,
                                        GainedPoint,
                                        HostPoint,
                                        reviseDate(JoinDate),
                                        Status,
                                        isPassed,
                                    ]
                                    return (
                                        <li className={`tr${i} tr`} key={'member' + i}>
                                            {createDiv(arr)}
                                        </li>
                                    )
                                }
                            })}
                    </ul>
                </div>
                <div className="memberListMemo">
                    <ul>
                        <li>會員Status: 0-新註冊 2-正常  5-前月點數未滿  9-刪除</li>
                    </ul>
                </div>
            </div>
            */
        )
    }
}

// export default Calendar
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying,
        initALLMemberData: state.auth.initALLMemberData,
        isAdminAccount: state.auth.isAdminAccount,
    }
}

export default connect(mapStateToProps)(MemberList)
