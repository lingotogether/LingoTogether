import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import Calendar from '../components/Calendar';
import '../style/VIPHome.scss';
import ClassForm from '../components/ClassForm';
import { cBoxController } from '../actions/auth';
import { hendleDBactions } from '../actions/handleDB';

const cx = require('classnames');
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            GainedPoint: this.props.CurrentUser?.memberData.GainedPoint || 0,
            HostPoint: this.props.CurrentUser?.memberData.HostPoint || 0,
            CurrentUser: this.props.CurrentUser,
        };
    }
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());
    };

    componentDidUpdate(prevProps) {
        const setNewMemberPoint = d => {
            this.setState({
                GainedPoint: d.GainedPoint,
                HostPoint: d.HostPoint,
            });
        };
        if (prevProps.cBoxShow !== this.props.cBoxShow) {
            this.props.CurrentUser?.email &&
                hendleDBactions(
                    'memberCard',
                    this.props.CurrentUser.email,
                    '',
                    'getMemberCardByEmail',
                    setNewMemberPoint
                );

            this.setState({
                CurrentUser: this.props.CurrentUser,
            });
        }
    }

    render() {
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
        } = this.props;

        const skRoom = {
            b: 'https://join.skype.com/NlAuDN2juIwU',
            m: 'https://join.skype.com/TkN4x9KKLS3u',
            a: 'https://join.skype.com/McjLCg9YvKH7',
        };

        const skOnclick = url => {
            if (window.confirm('Please remember to LEAVE the room after your discussion!')) {
                window.open(url);
            } else {
                return;
            }
        };
        return (
            <div className={cx('VIPhome', { mobile: deviceIsMobile })}>
                <div
                    className={cx('mask', { cardActive: cBoxShow })}
                    onClick={() => {
                        dispatch(cBoxController(false));
                    }}
                ></div>
                <div className="classForm">
                    {cBoxShow ? (
                        <ClassForm
                            {...BookingDateData}
                            CurrentUser={this.state.CurrentUser}
                            {...this.props}
                            isAdminAccount={isAdminAccount}
                        />
                    ) : null}
                </div>
                <div className="calendar viphomes">
                    <Calendar
                        initBookingData={initBookingData}
                        CurrentUser={this.state.CurrentUser}
                    />
                </div>
                {isAuthenticated ? (
                    <div className="skQRcode">
                        <ul>
                            <li onClick={() => skOnclick(skRoom.b)}>
                                <img src={require('../img/sk1.png')} alt="basic" />
                            </li>
                            <li onClick={() => skOnclick(skRoom.m)}>
                                <img src={require('../img/sk2.png')} alt="m" />
                            </li>
                            <li onClick={() => skOnclick(skRoom.a)}>
                                <img src={require('../img/sk3.png')} alt="a" />
                            </li>
                        </ul>
                    </div>
                ) : null}

                {isLoggingOut && <p>Logging Out....</p>}
                {logoutError && <p>Error logging out</p>}
            </div>
        );
    }
}
function mapStateToProps(state) {
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
    };
}
export default connect(mapStateToProps)(Home); //home 啟動時，那些store放的資料要當作props
