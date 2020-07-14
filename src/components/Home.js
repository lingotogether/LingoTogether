import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import Calendar from '../components/Calendar'
import ClassForm from '../components/ClassForm'
import { cBoxController } from '../actions/auth'
import { hendleDBactions } from '../actions/handleDB'
import { saveBookingData, saveALLMemberData } from '../actions'
import '../style/VIPHome.scss'

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
                (d) => console.log(d)
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
    } = props

    const skRoomUrl = {
        '0': 'https://join.skype.com/Who4S01c1PJA',
        '1': 'https://join.skype.com/V6cKAUtrQ5CA',
        '2': 'https://join.skype.com/UZKhFaomllWf',
    }

    const resetMemberData = d => {
        console.log(748998713)
        props.dispatch(saveALLMemberData(d))
    }

    const resetBookingData = d => {
        console.log(748998713)
        props.dispatch(saveBookingData(d))
    }

    const updatePoints = (booking, level) => {
        const isHost = booking.CreateUserID === CurrentUser.uid
        const today = dayjs().format('YYYY/MM/DD')
        const bookingDate = booking.date
        const bookingHour = booking.time.substring(0, 2)
        const currentHour = dayjs().format('HH')
        const currentTime = dayjs().format('HHmm')
        const lastTime = bookingHour + '50'

        const isRightLevel = booking.classLv === level

        const allowAddPoint = () => {
            if(!CurrentUser.memberData.pointed_at) return true
            const pointedAt = CurrentUser.memberData.pointed_at.toDate()
            const limitTime = new Date(pointedAt.getTime() + 15*60000)

            // current time is within pointAt time to pointedAt time + 15 => not allow
            return pointedAt > new Date() || new Date() > limitTime
        }

        if(!allowAddPoint()) return

        // 是否準時 & 正確的 level
        if(
            bookingDate === today &&
            currentHour === bookingHour &&
            currentTime <= lastTime &&
            isRightLevel
        ) {
            if(isHost) {
                hendleDBactions(
                    'memberCard',
                    CurrentUser.email,
                    {
                        ...CurrentUser.memberData,
                        HostPoint: CurrentUser.memberData.HostPoint + 2.5,
                        pointed_at: new Date()
                    },
                    'UPDATE'
                )
            } else {
                // 是否點 Join
                if(booking.whoJoinEmail.includes(CurrentUser.email)) {
                    hendleDBactions(
                        'memberCard',
                        CurrentUser.email,
                        {
                            ...CurrentUser.memberData,
                            GainedPoint: CurrentUser.memberData.GainedPoint + 1,
                            pointed_at: new Date()
                        },
                        'UPDATE'
                    ) 
                    // alert('Congratulations! +1 Bread! ')                   
                }
            }
        }
        hendleDBactions('memberCard', '', '', '', resetMemberData)
        hendleDBactions('booking', '', '', '', resetBookingData)
    }

    const skOnclick = level => {
        if (window.confirm('Please remember to LEAVE the room after your discussion!')) {
            hendleDBactions(
                'booking',
                '',
                '',
                'getBookingByUid',
                booking => {
                    if(booking.noData) return 
                    updatePoints(booking, level)
                }
            )
            window.open(skRoomUrl[level])
        } else {
            return
        }
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

const mapStateToProps = state => {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        cBoxShow: state.auth.cBoxShow,
        BookingDateData: state.auth.BookingDateData,
        CurrentUser: state.auth.CurrentUser,
        initBookingData: state.auth.initBookingData, //home 啟動時，那些store放的資料要當作props
        isAdminAccount: state.auth.isAdminAccount,
        deviceIsMobile: state.auth.deviceIsMobile,
        isAuthenticated: state.auth.isAuthenticated,
        initALLMemberData: state.auth.initALLMemberData,
    }
}
export default connect(mapStateToProps)(Home) //home 啟動時，那些store放的資料要當作props
