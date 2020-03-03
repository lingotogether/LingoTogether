import React from 'react';
import { connect } from 'react-redux';
import Clipboard from 'react-clipboard.js';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { hendleDBactions } from '../../actions/handleDB';
import { db } from '../../firebase/firebase';
import { saveALLMemberData } from '../../actions';
import { Redirect } from 'react-router-dom';
// let dayjs = require('dayjs');
function MemberList(props) {
    const { useState, useEffect } = React;
    const { dispatch, initALLMemberData, isAdminAccount } = props;
    const [isPass, setIsPass] = React.useState(false);

    useEffect(() => {
        // console.log('initALLMemberData', initBookingData);
        // if (initALLMemberData) {
        //     console.log('initALLMemberData', initALLMemberData);
        // }
    }, [initALLMemberData]);

    useEffect(() => {
        resetALLMemberData();
    }, [isPass]);

    const handlePass = e => {
        const Email = e.target.getAttribute('name');

        setIsPass(true);
        hendleDBactions(
            'memberCard',
            Email,
            {
                isPassed: true,
                Status: 2,
            },
            'UPDATE'
        );

        // resetBookingData();

        // setiStatus(Status);
        // hendleDBactions('member', DataID, updateOBJ, 'UPDATE');
    };
    const reviseDate = date => {
        if (date) {
            const theD = new Date(date.seconds * 1000);
            const YYYY = theD.getFullYear();
            const MM = theD.getMonth() + 1;
            const DD = theD.getDate();
            return YYYY + '/' + MM + '/' + DD;
        }
    };

    const deleteMember = e => {
        const dom = e.target;
        const Email = dom.getAttribute('data-email');
        //實際刪除
        // if (window.confirm('Are you sure you want to permanently delete this member?')) {
        //     hendleDBactions('memberCard', Email, {}, 'DELETE');
        //     setTimeout(function() {
        //         console.log('setTimeout');
        //         resetALLMemberData();
        //     }, 1000);
        // } else {
        //     return;
        //     // alert('Cancel deleteing');
        // }
        //改為保留資料 但更改狀態
        if (window.confirm('Are you sure you want to permanently delete this member?')) {
            hendleDBactions(
                'memberCard',
                Email,
                {
                    Status: 9,
                },
                'UPDATE'
            );
            setTimeout(function() {
                resetALLMemberData();
            }, 1000);
        } else {
            return;
            // alert('Cancel deleteing');
        }
    };

    const resetALLMemberData = () => {
        db.collection('memberCard')
            .get()
            .then(snapshot => {
                let initALLMemberData = [];
                snapshot.forEach(doc => {
                    const booked = doc.data(); //obj
                    initALLMemberData.push({ ...booked, DataID: doc.id });
                });

                dispatch(saveALLMemberData(initALLMemberData));
            });
    };

    const createDiv = arr => {
        const table = [];
        const userEmail = arr[2];
        //delete icon
        table.push(
            <div
                className="small delete"
                key="delete"
                onClick={e => {
                    deleteMember(e);
                }}
            >
                <DeleteOutlinedIcon data-email={userEmail} />
            </div>
        );
        arr.map((val, i) => {
            if (i < 5 && i > 0) {
                table.push(
                    <Clipboard data-clipboard-text={val} key={val + i}>
                        {val}
                    </Clipboard>
                );
            } else {
                if (i === 7) {
                    // joinDate 寬的
                    table.push(<div key={val + i}>{val}</div>);
                } else if (i === 9) {
                    //interview checkbox
                    table.push(
                        <div className="small" key={'checkbox' + val + i}>
                            <input
                                name={userEmail}
                                type="checkbox"
                                checked={val}
                                disabled={val}
                                onChange={e => {
                                    handlePass(e);
                                }}
                            />
                        </div>
                    );
                } else {
                    table.push(
                        <div className="small" key={val + i}>
                            {val}
                        </div>
                    );
                }
            }
        });

        return table;
    };
    if (!isAdminAccount) {
        // non AdminAccount out
        return <Redirect to="/TopHome" />;
    } else {
        return (
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
                                    } = item;
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
                                    ];
                                    return (
                                        <li className={`tr${i} tr`} key={'member' + i}>
                                            {createDiv(arr)}
                                        </li>
                                    );
                                }
                            })}
                    </ul>
                </div>
                <div className="memberListMemo">
                    <ul>
                        <li>會員Status: 0-新註冊; 2-正常 ; 5-前月點數未滿 ; 9-刪除</li>
                    </ul>
                </div>
            </div>
        );
    }
}

// export default Calendar;
function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying,
        initALLMemberData: state.auth.initALLMemberData,
        isAdminAccount: state.auth.isAdminAccount,
    };
}

export default connect(mapStateToProps)(MemberList);
