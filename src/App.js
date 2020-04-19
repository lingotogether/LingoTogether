import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/NavBar';
import TopHome from './TopHome';
import { deviceIsMobile } from './actions/';

import { hendleDBactions } from './actions/handleDB';
import MemberList from './components/MemberList';
var cx = require('classnames');

function App(props) {
    const { isAuthenticated, isVerifying, dispatch, CurrentUser } = props;
    const [withMData, setWithMData] = React.useState(false);
    // const [VIPactive, setVIPactive] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);
    const [noShow, setNoShow] = React.useState(true);
    const [ActiveNav, setActiveNav] = React.useState(0);
    // const handleLogout = () => {
    //     setVIPactive(false);
    //     dispatch(logoutUser());
    // };

    const userWithoutData = () => {
        if (CurrentUser) {
            const { email } = CurrentUser;
            hendleDBactions('memberCard', email, '', 'getMemberCardByEmail', handleUserData);
        }
    };

    const handleUserData = d => {
        d.noData ? setWithMData(true) : setWithMData(false);
    };
    React.useEffect(() => {
        userWithoutData();
    }, [CurrentUser]);

    // const LocationHash = where => {
    //     setTimeout((window.location.hash = where), 3000);
    // };
    // const [isMobile, setIsMobile] = React.useState(false);
    const handleRWD = () => {
        const isMobile = window.innerWidth > 576 ? false : true;
        setIsMobile(isMobile);
        dispatch(deviceIsMobile(isMobile));
    };

    React.useEffect(() => {
        handleRWD();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleRWD);
        return () => {
            window.removeEventListener('resize', handleRWD);
        };
    }, []);
    const handleScroll = e => {
        console.log(e.path[1].scrollY, 'clientHeight');
        const scrollY = e.path[1].scrollY;
        if (scrollY > 600 && 1538 > scrollY) {
            setActiveNav(0);
        } else if (2911 > scrollY && scrollY > 1538) {
            setActiveNav(1);
        } else if (3755 > scrollY && scrollY > 2911) {
            setActiveNav(2);
        } else if (scrollY > 3755) {
            setActiveNav(3);
        } else {
            setActiveNav(0);
        }
    };

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
                        isAuthenticated && (
                            <div className="beads">
                                Earned Beads<br/>
                                <span className="score">
                                    { CurrentUser ? CurrentUser.memberData.HostPoint || 0 : 0 } pts
                                </span>
                            </div>
                        )
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
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/admin" component={MemberList} />
                <Route path="/TopHome" component={TopHome} />
            </Switch>
        </Fragment>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying,
        CurrentUser: state.auth.CurrentUser,
        initALLMemberData: state.auth.initALLMemberData,
        isAdminAccount: state.auth.isAdminAccount,
    };
}

export default connect(mapStateToProps)(App);
