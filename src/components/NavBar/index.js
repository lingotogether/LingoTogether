import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../actions/'
import { hendleDBactions } from '../../actions/handleDB'
import Profile from './Profile'

var cx = require('classnames')
function Navbar(props) {
    const { isAuthenticated, dispatch, CurrentUser, isAdminAccount, deviceM, ActiveNav, isEnglish } = props
    const [withMData, setWithMData] = React.useState(false)
    const [VIPactive, setVIPactive] = React.useState(false)
    const [isMobile, setIsMobile] = React.useState(deviceM)
    const [nowActive, setNowActive] = React.useState(ActiveNav)
    const handleLogout = i => {
        setNowActive(i)
        setVIPactive(false)
        dispatch(logoutUser())
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
    React.useEffect(() => {
        userWithoutData()
    }, [CurrentUser])
    React.useEffect(() => {
        setNowActive(ActiveNav)
    }, [ActiveNav])

    const LocationHash = (i, where) => {
        if (where !== '') {
            setTimeout((window.location.hash = where), 3000)
        }
        setNowActive(i)
    }

    const handleRWD = () => {
        window.innerWidth > 576 ? setIsMobile(false) : setIsMobile(true)
    }

    React.useEffect(() => {
        handleRWD()
        window.addEventListener('resize', handleRWD)

        return () => {
            window.removeEventListener('resize', handleRWD)
        }
    }, [])

    return (
        <Fragment>
            <ul className={cx({ mobileBar: isMobile })}>
                {CurrentUser && VIPactive ? (
                    <li className="sayHiString">
                        Welcome back!
                        {CurrentUser.memberData && CurrentUser.memberData.UserName !== undefined
                            ? ' ' + CurrentUser.memberData.UserName
                            : ''}
                    </li>
                ) : null}
                {!VIPactive ? (
                    <Fragment>                     
                        <li className={cx('nav-0', { active: nowActive === 0 })}>
                            <a href="/TopHome#Outlets" onClick={() => LocationHash(0, '#Outlets')}>
                                {isEnglish ? <span>About us</span> : <span>關於我們</span>}
                                {isMobile ? null : <br />}                                
                            </a>
                        </li>
                        {
                            /*
                                <li className={cx('nav-1', { active: nowActive === 1 })}>
                                    <a href="/TopHome#Rules" onClick={() => LocationHash(1, '#Rules')}>
                                        Rules
                                        {isMobile ? null : <br />}
                                        規制
                                    </a>
                                </li>
                            */
                        }
                        <li className={cx('nav-2', { active: nowActive === 2 })}>
                            <a
                                href="/TopHome#Calendar"
                                onClick={() => LocationHash(2, '#Calendar')}
                            >
                                {isEnglish ? <span>Calender</span> : <span>日曆</span>}                                
                                {isMobile ? null : <br />}                                
                            </a>
                        </li>
                        <li className={cx('nav-3', { active: nowActive === 3 })}>
                            <a href="/TopHome#Steps" onClick={() => LocationHash(3, '#Steps')}>
                                {isEnglish ? <span>Join us</span> : <span>加入我們</span>}                                
                                {isMobile ? null : <br />}                                
                            </a>
                        </li>
                    </Fragment>
                ) : null}
                {!isAuthenticated ? (
                    <li
                        className={cx('nav-1', { active: nowActive === 8 })}
                        onClick={() => LocationHash(8, '')}
                    >
                        <Link to="/login">
                            {isEnglish ? <span>Log in</span> : <span>登入</span>}                            
                            {isMobile ? null : <br />}                            
                        </Link>
                    </li>
                ) : null}

                {!isAuthenticated ? (
                    <Fragment>
                        <li
                            className={cx('nav-1', { active: nowActive === 7 })}
                            onClick={() => LocationHash(7, '')}
                        >
                            <Link to="/signup">
                                {isEnglish ? <span>Sign up</span> : <span>註冊</span>}                                
                                {isMobile ? null : <br />}                            
                            </Link>
                        </li>
                    </Fragment>
                ) : null}
                {isAdminAccount ? (
                    <li
                        className={cx('nav-1', { active: nowActive === 4 })}
                        onClick={() => LocationHash(4, '')}
                    >
                        <Link to="/admin">                            
                            {isEnglish ? <span>MemberList</span> : <span>會員清單</span>}
                            {isMobile ? null : <br />}
                        </Link>
                    </li>
                ) : null}
                {isAuthenticated ? (
                    <Fragment>
                        <li
                            className={cx('nav-1', { active: nowActive === 5 })}
                            onClick={() => LocationHash(5, '')}
                        >
                            <Link
                                to="/"
                                onClick={() => {
                                    setVIPactive(true)
                                }}
                            >
                                {isEnglish ? <span>Vip</span> : <span>會員專區</span>}                                
                                {isMobile ? null : <br />}                                 
                            </Link>
                        </li>
                        <li className={cx('nav-1', { active: nowActive === 6 })}>
                        {
                            /*
                            <a onClick={handleLogout}>
                                Log out
                                {isMobile ? null : <br />}
                                登出
                            </a>
                            */
                        }
                            <Profile dispatch={dispatch} CurrentUser={CurrentUser}/>
                        </li>
                    </Fragment>
                ) : null}
            </ul>
        </Fragment>
    )
}

export default Navbar
