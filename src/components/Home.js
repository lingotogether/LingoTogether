import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import Calendar from '../components/Calendar'
import ClassForm from '../components/ClassForm'
import { cBoxController } from '../actions/auth'
import { hendleDBactions } from '../actions/handleDB'
import { saveBookingData, saveALLMemberData, saveBeadsRecordData } from '../actions'
import '../style/VIPHome.scss'

// For timestamp of firebase
import * as firebase from 'firebase/app'

const cx = require('classnames')

const Home = (props) => {

    const [ CurrentUser, setCurrentUser ] = useState(props.CurrentUser)

    useEffect(() => {
        props.CurrentUser?.email &&
            hendleDBactions(
                'memberCard',
                props.CurrentUser.email,
                '',
                'getMemberCardByEmail',
                (data) => console.log('setCurrentUser: ', data)
            )
        setCurrentUser(props.CurrentUser)
    }, [props.cBoxShow, props.CurrentUser])

    const {
        isLoggingOut,
        logoutError,
        cBoxShow,
        BookingDateData,
        initBookingData,
        isAdminAccount,
        deviceIsMobile,
        isAuthenticated,
        dispatch,
        initALLMemberData,
    } = props

    const skRoomUrl = {
        '0': 'https://join.skype.com/Who4S01c1PJA',
        '1': 'https://join.skype.com/V6cKAUtrQ5CA',
        '2': 'https://join.skype.com/UZKhFaomllWf',
    }

    const classLvMap = [
		'-Ba-',
		'-In-',
		'-Adv-'
	]

    const resetMemberData = newData => {
        dispatch(saveALLMemberData(newData))
    }

    const resetBookingData = newData => {
        dispatch(saveBookingData(newData))
    }

    const resetBeadsRecordData = newData => {
        dispatch(saveBeadsRecordData(newData))
    }

    const updatePoints = (booking, level, today) => {

        const isHost = booking.CreateUserID === CurrentUser.uid
        const index = booking.whoJoinEmail.indexOf(CurrentUser.email)

        const bookingTime = 
            dayjs()
                .hour(booking.time.substring(0, 2))
                .minute(booking.time.substring(2, 4))
                .second('0')
        const StartLimitTime = bookingTime.subtract(15, 'minute')
        const LateTime = bookingTime.add(15, 'minute')
        const EndLimitTime = bookingTime.add(20, 'minute')
        const currentTime = dayjs()
        // const currentTime = dayjs().hour(22).minute(17) // For testing

        const bookingDate = 
                dayjs()
                    .year(booking.date.substring(0, 4))
                    .month(booking.date.substring(5, 7))
                    .date(booking.date.substring(8, 10))
                    .subtract(1, 'month')
					.hour(booking.time.substring(0, 2))
                    .minute(booking.time.substring(2, 4))
                    .second(0)

        let status = ""
        // Early
        if (currentTime.isBefore(StartLimitTime)) status = "EARLY"
        // Late
        else if (currentTime.isAfter(LateTime) && currentTime.isBefore(EndLimitTime)) status = "LATE"
        // On time
        else if (currentTime.isAfter(StartLimitTime) && currentTime.isBefore(EndLimitTime)) status = "ON TIME"
        // Absent
        else status = "ABSENT"

        if (status === "EARLY" && today) {
            alert('Please wait until 15 minutes before the start of meeting~')
        }
        else if (status === "ABSENT") {

            // Alert
            if (isHost && !booking.hostSettlement && today) {
                alert('Sorry... You are late for more than ㄉ0 minutes...\n \
In this case, system regards you as absent.\n \
We will take 30 beads away from you as a punishment.')
            }
            else if (!booking.settlement[index] && today) {
                alert('Sorry... You are late for more than 20 minutes...\n \
In this case, system regards you as absent.\n \
We will take 20 beads away from you as a punishment.')
            }
            else if (today) alert('You can\'t enter meeting that started over 20 minutes')

            // Settle host and participants who haven't enter meeting yet
            async function settleHostAndParticipants() {

                if (!booking.hostSettlement) {

                    const hostMemberData = initALLMemberData.filter(data => {
                        return data.uid === booking.CreateUserID
                    })[0]

                    hendleDBactions('beadsRecord',
                        bookingDate.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'absent-' + hostMemberData.uid, {
                            Date: firebase.firestore.Timestamp.fromMillis(bookingDate.valueOf()),
                            Level: booking.classLv,
                            Bead: -30,
                            Title: "Being a host",
                            Status: "Host absent",
                            FromUserID: "system",
                            ToUserID: booking.CreateUserID,
                        }, 'SET',
                    )

                    hendleDBactions('memberCard',
                        hostMemberData.DataID, {
                            ...hostMemberData,
                            Bead: hostMemberData.Bead - 30,
                        }, 'UPDATE',
                    )

                    hendleDBactions('booking',
                        booking.DataID, {
                            ...booking,
                            hostSettlement: true,
                        }, 'UPDATE',
                    )

                    booking.hostSettlement = true
                    await new Promise(r => setTimeout(r, 3000));
                }

                for (var i = 0; i < booking.settlement.length; i++) {

                    if (!booking.settlement[i]) {

                        const participantMemberData = initALLMemberData.filter(data => {
                            return data.Email === booking.whoJoinEmail[i]
                        })[0]
                        
                        hendleDBactions('beadsRecord',
                            bookingDate.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'absent-' + participantMemberData.uid, {
                                Date: firebase.firestore.Timestamp.fromMillis(bookingDate.valueOf()),
                                Level: booking.classLv,
                                Bead: -20,
                                Title: "Being a participant",
                                Status: "Participant absent",
                                FromUserID: "system",
                                ToUserID: participantMemberData.uid,
                            }, 'SET',
                        )
        
                        hendleDBactions('memberCard',
                            participantMemberData.DataID, {
                                ...participantMemberData,
                                Bead: participantMemberData.Bead - 20,
                            }, 'UPDATE',
                        )
        
                        hendleDBactions('booking',
                            booking.DataID, {
                                ...booking,
                                settlement: booking.settlement.map((item, j) => {
                                    if (j === i) return true
                                    else return item
                                }),
                            }, 'UPDATE',
                        )

                        booking.settlement[i] = true
                        await new Promise(r => setTimeout(r, 3000));
                    }
                }

                hendleDBactions('beadsRecord', '', {}, '', resetBeadsRecordData)
                hendleDBactions('memberCard', '', {}, '', resetMemberData)
                hendleDBactions('booking', '', {}, '', resetBookingData)
            }

            settleHostAndParticipants()
        }
        else {

            if (status === "ON TIME") {

                async function settleHostAndParticipants() {
                    
                    if (isHost && !booking.hostSettlement) {

                        if (today) alert('Great! You are on time!\nYou will get 20 beads as a reward.')

                        const hostMemberData = initALLMemberData.filter(data => {
                            return data.uid === booking.CreateUserID
                        })[0]
    
                        hendleDBactions('beadsRecord',
                            bookingDate.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'punctual-' + hostMemberData.uid, {
                                Date: firebase.firestore.Timestamp.fromMillis(bookingDate.valueOf()),
                                Level: booking.classLv,
                                Bead: 20,
                                Title: "Being a host",
                                Status: "Host punctual",
                                FromUserID: "system",
                                ToUserID: booking.CreateUserID,
                            }, 'SET',
                        )
    
                        hendleDBactions('memberCard',
                            hostMemberData.DataID, {
                                ...hostMemberData,
                                Bead: hostMemberData.Bead + 20,
                            }, 'UPDATE',
                        )
    
                        hendleDBactions('booking',
                            booking.DataID, {
                                ...booking,
                                hostSettlement: true,
                            }, 'UPDATE',
                        )
    
                        booking.hostSettlement = true
                        await new Promise(r => setTimeout(r, 3000));
                    }
                    else if (!booking.settlement[index]) {

                        if (today) alert('Great! You are on time!\nYou will get 10 beads as a reward.')

                        const participantMemberData = initALLMemberData.filter(data => {
                            return data.Email === booking.whoJoinEmail[index]
                        })[0]
                        
                        hendleDBactions('beadsRecord',
                            bookingDate.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'punctual-' + participantMemberData.uid, {
                                Date: firebase.firestore.Timestamp.fromMillis(bookingDate.valueOf()),
                                Level: booking.classLv,
                                Bead: 10,
                                Title: "Being a participant",
                                Status: "Participant punctual",
                                FromUserID: "system",
                                ToUserID: participantMemberData.uid,
                            }, 'SET',
                        )
        
                        hendleDBactions('memberCard',
                            participantMemberData.DataID, {
                                ...participantMemberData,
                                Bead: participantMemberData.Bead + 10,
                            }, 'UPDATE',
                        )
        
                        hendleDBactions('booking',
                            booking.DataID, {
                                ...booking,
                                settlement: booking.settlement.map((item, j) => {
                                    if (j === index) return true
                                    else return item
                                }),
                            }, 'UPDATE',
                        )

                        booking.settlement[index] = true
                        await new Promise(r => setTimeout(r, 3000));
                    }

                    hendleDBactions('beadsRecord', '', {}, '', resetBeadsRecordData)
                    hendleDBactions('memberCard', '', {}, '', resetMemberData)
                    hendleDBactions('booking', '', {}, '', resetBookingData)
                }
                
                settleHostAndParticipants()
            }
            else if (status === "LATE") {

                async function settleHostAndParticipants() {
                    
                    if (isHost && !booking.hostSettlement) {

                        if (today) alert('Oops! You are late for more than 15 minutes...\n \
You can get 20 beads for reward only if you host punctually!')

                        const hostMemberData = initALLMemberData.filter(data => {
                            return data.uid === booking.CreateUserID
                        })[0]
    
                        hendleDBactions('beadsRecord',
                            bookingDate.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'tardy-' + hostMemberData.uid, {
                                Date: firebase.firestore.Timestamp.fromMillis(bookingDate.valueOf()),
                                Level: booking.classLv,
                                Bead: 0,
                                Title: "Being a host",
                                Status: "Host tardy",
                                FromUserID: "system",
                                ToUserID: booking.CreateUserID,
                            }, 'SET',
                        )
    
                        // hendleDBactions('memberCard',
                        //     hostMemberData.DataID, {
                        //         ...hostMemberData,
                        //         Bead: hostMemberData.Bead + 20,
                        //     }, 'UPDATE',
                        // )
    
                        hendleDBactions('booking',
                            booking.DataID, {
                                ...booking,
                                hostSettlement: true,
                            }, 'UPDATE',
                        )
    
                        booking.hostSettlement = true
                        await new Promise(r => setTimeout(r, 3000));
                    }
                    else if (!booking.settlement[index]) {

                        if (today) alert('Oops! You are late for more than 15 minutes...\n \
You can get 10 beads for reward only if you participate punctually!')

                        const participantMemberData = initALLMemberData.filter(data => {
                            return data.Email === booking.whoJoinEmail[index]
                        })[0]
                        
                        hendleDBactions('beadsRecord',
                            bookingDate.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'tardy-' + participantMemberData.uid, {
                                Date: firebase.firestore.Timestamp.fromMillis(bookingDate.valueOf()),
                                Level: booking.classLv,
                                Bead: 0,
                                Title: "Being a participant",
                                Status: "Participant tardy",
                                FromUserID: "system",
                                ToUserID: participantMemberData.uid,
                            }, 'SET',
                        )
        
                        // hendleDBactions('memberCard',
                        //     participantMemberData.DataID, {
                        //         ...participantMemberData,
                        //         Bead: participantMemberData.Bead,
                        //     }, 'UPDATE',
                        // )
        
                        hendleDBactions('booking',
                            booking.DataID, {
                                ...booking,
                                settlement: booking.settlement.map((item, j) => {
                                    if (j === index) return true
                                    else return item
                                }),
                            }, 'UPDATE',
                        )

                        booking.settlement[index] = true
                        await new Promise(r => setTimeout(r, 3000));
                    }

                    hendleDBactions('beadsRecord', '', {}, '', resetBeadsRecordData)
                    // hendleDBactions('memberCard', '', {}, '', resetMemberData)
                    hendleDBactions('booking', '', {}, '', resetBookingData)
                }
                
                settleHostAndParticipants()
            }

            if (today)
                if (window.confirm('Please remember to LEAVE the room after your discussion!'))
                    window.open(skRoomUrl[level])
        }

        return
    }


    // Click the button right on the page for entering Skype meeting room
    const skOnclick = level => {

        // Beads rewarding
        hendleDBactions(
            'booking',
            '',
            {
                date: dayjs().format('YYYY/MM/DD'),
                level: level
            },
            'getBookingByDateAndLevel',
            booking => {
                console.log(booking)
                if (booking.noData)
                    alert('今天沒有這個難度的讀書會喔！\nThere\'s no meeting of this level today!')
                else if (booking.CreateUserID !== CurrentUser.uid && booking.whoJoinEmail.indexOf(CurrentUser.email) === -1) 
                    alert('您並沒有報名這場讀書會喔～\nYou didn\'t join this meeting so you are not allowed to get in~')
                else updatePoints(booking, level, true)
            }
        )

        // Check for last meeting's reward settlements
        hendleDBactions(
            'booking',
            '',
            dayjs().format('YYYY/MM/DD'),
            'getLastBookingBeforeDate',
            booking => {
                if (booking.noData) return
                updatePoints(booking, level, false)
            }
        )
    }

    return (
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
                        {...BookingDateData}
                        CurrentUser={CurrentUser}
                        {...props}
                        isAdminAccount={isAdminAccount}
                    />
                ) : null}
            </div>
            <div className="calendar viphomes">
                <Calendar
                    initBookingData={initBookingData}
                    CurrentUser={CurrentUser}
                />
            </div>
            {isAuthenticated ? (
                <div className="skQRcode">
                    <ul>
                        <li onClick={() => skOnclick(0)}>
                            <img src={require('../img/Ba_room.png')} alt="basic" />
                        </li>
                        <li onClick={() => skOnclick(1)}>
                            <img src={require('../img/In_room.png')} alt="m" />
                        </li>
                        <li onClick={() => skOnclick(2)}>
                            <img src={require('../img/Adv_room.png')} alt="a" />
                        </li>
                    </ul>
                </div>
            ) : null}

            {isLoggingOut && <p>Logging Out....</p>}
            {logoutError && <p>Error logging out</p>}
        </div>
    )
}

// home 啟動時，那些 store 放的資料要當作 props
const mapStateToProps = state => {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        cBoxShow: state.auth.cBoxShow,
        BookingDateData: state.auth.BookingDateData,
        CurrentUser: state.auth.CurrentUser,
        initBookingData: state.auth.initBookingData,
        isAdminAccount: state.auth.isAdminAccount,
        deviceIsMobile: state.auth.deviceIsMobile,
        isAuthenticated: state.auth.isAuthenticated,
        initALLMemberData: state.auth.initALLMemberData,
    }
}

// home 啟動時，那些 store 放的資料要當作 props
export default connect(mapStateToProps)(Home)
