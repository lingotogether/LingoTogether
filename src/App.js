import React, { Fragment, useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/NavBar'
import TopHome from './TopHome'
import FAQ from './FAQ'
import ReceivedBeads from './components/PersonalPage/ReceivedBeads'
import RewardHost from './components/PersonalPage/RewardHost'
import BeadsExchange from './components/PersonalPage/BeadsExchange'
import MonthlyMission from './components/PersonalPage/MonthlyMission'
import PracticeCalendar from './components/PersonalPage/PracticeCalendar'
import { deviceIsMobile } from './actions/'
import Scroll from './components/PersonalPage/Scroll'

import { hendleDBactions } from './actions/handleDB'
import MemberList from './components/MemberList'
import { MenuList } from '@material-ui/core'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { LocalConvenienceStoreOutlined } from '@material-ui/icons'

let cx = require('classnames')


function App(props) {
    const { isAuthenticated, isVerifying, dispatch, CurrentUser, } = props
    const [withMData, setWithMData] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [noShow, setNoShow] = useState(true)
    const [ActiveNav, setActiveNav] = useState(0)    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();
    const [isEnglish, setIsEnglish] = useState(false);    

    const handleClick = (event) => {
        if (anchorEl !== event.currentTarget) {
        setAnchorEl(event.currentTarget);
        }
    }

    const handleClose = () => {        
        setAnchorEl(null);
    }       
    const handleLanguage = lang => {  
                
        
        const pathname = window.location.pathname;
        handleClose();
        setIsEnglish(lang === "EN" ? true : false);
        history.push({pathname: pathname, state: { isEnglish: lang === "EN" }});
    }

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
        // console.log(e.path[1].scrollY, 'clientHeight')
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
                        isMobile ? (
                            <div className="mNavbar" style={{display: noShow ? "flex" : "", flexDirection: 'row-reverse', alignItems: "center"}}>
                                <ul className="hamberIconContainer">
                                    <li onClick={() => setNoShow(!noShow)}>
                                        <div className="hamberBorder">
                                            <i className="fas fa-bars"></i>
                                        </div>
                                    </li>
                                </ul>
                                <div style={{display: "flex", alignItems: "center", marginTop: noShow ? "" : "30px"}}>
                                    <i className="fas fa-language fa-2x"
                                        style={{width: '30px', marginRight: '20px', color: '#3AB3A9', cursor: "pointer"}}
                                        aria-owns={anchorEl ? "simple-menu" : undefined}    
                                        onMouseOver={handleClick}                                                       
                                    ></i>
                                    <span style={{ width: '20px', textDecoration: 'underline', color: '#3AB3A9', marginRight: '20px'}}>{isEnglish ? "EN" : "CH"}</span>
                                </div>
                                
                                
                                <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} role={undefined} transition style={{zIndex: "100"}}> 
                                    <Paper>
                                        <MenuList
                                            id="simple-menu"                                            
                                            onMouseLeave={handleClose}
                                        >
                                            <MenuItem>Language</MenuItem>
                                            <MenuItem onClick={() => handleLanguage("EN")}>EN</MenuItem>
                                            <MenuItem onClick={() => handleLanguage("CH")}>CH</MenuItem>                                    
                                        </MenuList>
                                    </Paper>
                                </Popper> 

                                <div className={cx('BarHiddenPart', { noShow: noShow })}>
                                    <Navbar {...props} deviceM={isMobile} ActiveNav={ActiveNav} />                                    
                                </div>
                            </div>
                        ) : (
                            <div style={{display: "flex", flexDirection: 'row-reverse', alignItems: "center"}}>
                                <Navbar {...props} deviceM={isMobile} ActiveNav={ActiveNav} isEnglish={isEnglish} />                                
                                <span style={{ width: '20px', textDecoration: 'underline', color: '#3AB3A9', marginRight: '20px'}}>{isEnglish ? "EN" : "CH"}</span>
                                <i className="fas fa-language fa-2x"
                                    style={{width: '30px', marginRight: '20px', color: '#3AB3A9', cursor: "pointer"}}
                                    aria-owns={anchorEl ? "simple-menu" : undefined}    
                                    onMouseOver={handleClick}                                                       
                                ></i>
                                

                                <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} role={undefined} transition style={{zIndex: "10"}}> 
                                    <Paper>
                                        <MenuList
                                            id="simple-menu"                                            
                                            onMouseLeave={handleClose}
                                        >
                                            <MenuItem>Language</MenuItem>
                                            <MenuItem onClick={() => handleLanguage("EN")}>EN</MenuItem>
                                            <MenuItem onClick={() => handleLanguage("CH")}>CH</MenuItem>                                    
                                        </MenuList>
                                    </Paper>
                                </Popper>                      
                                
                            </div>
                        )
                    }
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
                    path="/reward-host"
                    component={RewardHost}
                    isAuthenticated={isAuthenticated}
                    isVerifying={isVerifying}
                />
                <ProtectedRoute
                    exact
                    path="/beads-exchange"
                    component={BeadsExchange}
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
                <ProtectedRoute
                    exact
                    path="/scroll"
                    component={Scroll}
                    isAuthenticated={isAuthenticated}
                    isVerifying={isVerifying}
                />                
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/admin" component={MemberList} />
                <Route path="/TopHome" component={TopHome} />
                <Route path="/FAQ" component={FAQ} />
                
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
