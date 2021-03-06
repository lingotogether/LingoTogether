import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CreateTable, createMonthBar, createWeekTable } from './createTable';
import { filterDetials, checkDate, filterMonthsWithData, completeMonthArr } from './filterTools';
import { cBoxController, BookingDateData } from '../../actions';
import '../../style/CalendarMain.scss';

function Calendar(props) {

    const { initBookingData, dispatch } = props;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1 < 10 ? 0 + '' + (today.getMonth() + 1) : today.getMonth() + 1;
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    // const [isList, setIsList] = useState(false);
    const [inputFall, setInputFall] = useState(false);
    const [activeID, setActiveID] = useState('');
    const [monthBarArr, setMonthBarArr] = useState([]);
    const [initYearMonth] = useState(year + '' + month);
    const [currentYearMonthIndex, setCurrentYearMonthIndex] = useState(1);
    const [activeYYYYMM, setActiveYYYYMM] = useState(year + '' + month);
    const [ThisMonthDetails, setThisMonthDetails] = useState([]);
    const [DirtyDate, setDirtyDate] = useState([]);
    const [cBoxShow, setCBoxShow] = useState(false);

    useEffect(() => {
        getDate();
    }, []);

    useEffect(() => {
        if (initBookingData) {
            filterMonths(initBookingData); // SetInitMonthData
        }
    }, [initBookingData]);

    const getDate = () => {
        if (initBookingData) {
            setInputFall(true);
            filterMonths(initBookingData); // SetInitMonthData
        } else {
            setInputFall(true);
            setActiveYYYYMM(year + '' + month);
            setMonthBarArr(completeMonthArr([year + '' + month], 1));
        }
    };

    const SetInitMonthData = (BarArr, targetIndex, targetYYYYMM, details, rowData, inputFall) => {
        setMonthBarArr(BarArr);
        setCurrentYearMonthIndex(targetIndex);
        setActiveYYYYMM(targetYYYYMM);
        setThisMonthDetails(details);
        setDirtyDate(rowData);
        setInputFall(inputFall);
    };

    const setNewMonth = (targetIndex, targetYYYYMM, detail) => {
        setCurrentYearMonthIndex(targetIndex);
        setActiveYYYYMM(targetYYYYMM);
        setThisMonthDetails(detail);
    };

    const filterMonths = bookingData => {
        // ????????????????????????
        let reg = /\d{4}(0[1-9]|1[0-2])$/;
        let regExp = new RegExp(reg);
        if (!regExp.test(initYearMonth)) {
            alert('?????????????????????????????????????????????????????????????????? YYYYMM ????????????');
        }
        let withVolidDate = !checkDate(bookingData);

        if (withVolidDate) {
            filterMonthsWithData(bookingData, initYearMonth, SetInitMonthData);
            CreateTable(activeYYYYMM, ThisMonthDetails, activeID, onClickDate);
        } else {
            alert('????????????????????????????????????????????????????????????????????????????????????YYYY/MM/DD');
            setCurrentYearMonthIndex(1);
            setThisMonthDetails([]);
            setDirtyDate(bookingData);
            setInputFall(true);
        }
    };

    const onClickPrev = e => {
        if (!props.CurrentUser) return;
        if (inputFall) {
            return;
        } else {
            // ??????????????????
            let prevData = [];
            if (currentYearMonthIndex - 1 < 1) {
                prevData = filterDetials(DirtyDate, monthBarArr[0]);
            } else {
                prevData = filterDetials(DirtyDate, monthBarArr[currentYearMonthIndex - 1]);
            }

            if (currentYearMonthIndex - 1 < 1) {
                setNewMonth(1, monthBarArr[0], prevData);
            } else {
                setNewMonth(
                    currentYearMonthIndex - 1,
                    monthBarArr[currentYearMonthIndex - 1],
                    prevData
                );
            }
        }
    };

    const onClickNext = e => {
        if (!props.CurrentUser) return;
        if (inputFall) {
            return;
        } else {
            let nextData = [];
            if (currentYearMonthIndex + 1 > monthBarArr.length - 2) {
                nextData = filterDetials(DirtyDate, monthBarArr[monthBarArr.length - 1]);
            } else {
                nextData = filterDetials(DirtyDate, monthBarArr[currentYearMonthIndex + 1]);
            }

            if (
                // ??????????????????
                currentYearMonthIndex + 1 >
                monthBarArr.length - 2
            ) {
                setNewMonth(monthBarArr.length - 2, monthBarArr[monthBarArr.length - 1], nextData);
            } else {
                setNewMonth(
                    currentYearMonthIndex + 1,
                    monthBarArr[currentYearMonthIndex + 1],
                    nextData
                );
            }
        }
    };

    const clickMonth = e => {
        if (!props.CurrentUser) return;
        if (inputFall) {
            return;
        } else {
            let findIndex = monthBarArr.indexOf(e.currentTarget.id);
            let detail = filterDetials(DirtyDate, monthBarArr[findIndex]);
            setNewMonth(findIndex, e.currentTarget.id, detail);
        }
    };

    const onClickDate = (e, thisDD) => {
        if (thisDD && !props.CurrentUser) return;
        dispatch(cBoxController(true));
        setCBoxShow(true);
        let detail = ThisMonthDetails[e.currentTarget.getAttribute('data-index')];
        if (!detail) {
            detail = { date: thisDD };
        }
        dispatch(BookingDateData(detail));

        setActiveID(e.currentTarget.id.toString());
    };

    return (
        <div className="calendar" style={{ paddingTop: '50px' }}>
            {/* <header>
                <div style={{ textAlign: "center" }}>{ '( Based on your time zone )' }</div>
            </header> */}
            <div className="monthBar">
                {props.CurrentUser ? (
                    <a className="bar-btn prev" onClick={e => onClickPrev(e)}>
                        <i className="fas fa-caret-left" />
                    </a>
                ) : (
                    <a className="bar-btn prev"></a>
                )}
                <div className="slider-move">
                    {createMonthBar(
                        monthBarArr,
                        currentYearMonthIndex,
                        activeYYYYMM,
                        clickMonth,
                        monthNames,
                        props.CurrentUser
                    )}
                </div>
                {props.CurrentUser ? (
                    <a className="bar-btn next" onClick={e => onClickNext(e)}>
                        <i className="fas fa-caret-right" />
                    </a>
                ) : null}
            </div>
            <div className='weekdays'>
                <ul>{ createWeekTable(weekday) }</ul>
            </div>
            <div className="table">
                <ul className='calendars_daymode'>
                    {CreateTable(
                        activeYYYYMM,
                        ThisMonthDetails,
                        activeID,
                        onClickDate
                    )}
                </ul>
            </div>
        </div>
    );
}

// export default Calendar;
function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying,
        initBookingData: state.auth.initBookingData,
    };
}

export default connect(mapStateToProps)(Calendar);
