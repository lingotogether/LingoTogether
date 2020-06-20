import React, { Fragment, useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/NavBar'
import TopHome from './TopHome'
import ReceivedBeads from './components/PersonalPage/ReceivedBeads'
import MonthlyMission from './components/PersonalPage/MonthlyMission'
import PracticeCalendar from './components/PersonalPage/PracticeCalendar'
import { deviceIsMobile } from './actions/'

import { hendleDBactions } from './actions/handleDB'
import MemberList from './components/MemberList'
let cx = require('classnames')

function App(props) {
    const { isAuthenticated, isVerifying, dispatch, CurrentUser } = props
    const [withMData, setWithMData] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [noShow, setNoShow] = useState(true)
    const [ActiveNav, setActiveNav] = useState(0)

    const userWithoutData = () => {
        if (CurrentUser) {
            const { email } = CurrentUser
            hendleDBactions('memberCard', email, '', 'getMemberCardByEmail', handleUserData)
        }
    }

    const handleUserData = d => {
        d.noData ? setWithMData(true) : setWithMData(false)
    }
    useEffect(() => {
        userWithoutData()
    }, [CurrentUser])

    const handleRWD = () => {
        const isMobile = window.innerWidth > 576 ? false : true
        setIsMobile(isMobile)
        dispatch(deviceIsMobile(isMobile))
    }

    useEffect(() => {
        handleRWD()
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleRWD)
        return () => {
            window.removeEventListener('resize', handleRWD)
        }
    }, [])
    const handleScroll = e => {
        console.log(e.path[1].scrollY, 'clientHeight')
        const scrollY = e.path[1].scrollY
        if (scrollY > 600 && 1538 > scrollY) {
            setActiveNav(0)
        } else if (2911 > scrollY && scrollY > 1538) {
            setActiveNav(1)
        } else if (3755 > scrollY && scrollY > 2911) {
            setActiveNav(2)
        } else if (scrollY > 3755) {
            setActiveNav(3)
        } else {
            setActiveNav(0)
        }
    }

    return (
        <Fragment>
            <div id="header">
                <nav className={cx('navbar', { mobileNavbar: !noShow }, { mobile: isMobile })}>
                    <div className="logo">
                        <a href="/">
                            <img src={require('./img/lingo-2-removebg.png')} alt="logo" />
                        </a>
                    </div>
                    {
                        /*
                        isAuthenticated && (
                            <Fragment>
                                <div className="beads">
                                    Host Beads<br/>
                                    <span className="score">
                                        { CurrentUser ? CurrentUser.memberData.HostPoint || 0 : 0 } pts
                                    </span>
                                </div>
                                <div className="beads">
                                    Gained Beads<br/>
                                    <span className="score">
                                        { CurrentUser ? CurrentUser.memberData.GainedPoint || 0 : 0 } pts
                                    </span>
                                </div>
                            </Fragment>
                        )
                        */
                    }
                    {isMobile ? (
                        <div className="mNavbar">
                            <ul className="hamberIconContainer">
                                <li onClick={() => setNoShow(!noShow)}>
                                    <div className="hamberBorder">
                                        <i className="fas fa-bars"></i>
                                    </div>
                                </li>
                            </ul>
                            <div className={cx('BarHiddenPart', { noShow: noShow })}>
                                <Navbar {...props} deviceM={isMobile} ActiveNav={ActiveNav} />
                            </div>
                        </div>
                    ) : (
                        <Navbar {...props} deviceM={isMobile} ActiveNav={ActiveNav} />
                    )}
                </nav>
            </div>

            <Switch>
                <ProtectedRoute
                    exact
                    path="/"
                    component={Home}
                    isAuthenticated={isAuthenticated}
                    isVerifying={isVerifying}
                />
                <ProtectedRoute
                    exact
                    path="/received-beads"
                    component={ReceivedBeads}
                    isAuthenticated={isAuthenticated}
                    isVerifying={isVerifying}
                />
                <ProtectedRoute
                    exact
                    path="/practice-calendar"
                    component={PracticeCalendar}
                    isAuthenticated={isAuthenticated}
                    isVerifying={isVerifying}
                />
                <ProtectedRoute
                    exact
                    path="/monthly-mission"
                    component={MonthlyMission}
                    isAuthenticated={isAuthenticated}
                    isVerifying={isVerifying}
                />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/admin" component={MemberList} />
                <Route path="/TopHome" component={TopHome} />
            </Switch>
        </Fragment>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying,
        CurrentUser: state.auth.CurrentUser,
        initALLMemberData: state.auth.initALLMemberData,
        isAdminAccount: state.auth.isAdminAccount,
    }
}

export default connect(mapStateToProps)(App)
