import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc'
// dayjs.extend(utc)

export const filterMonthsWithData = (bookingData, initYearMonth, SetInitMonthData) => {
    // deal with Month range
    // getMonthRangeArr(initYearMonth, 12); // 填充月份 起始年月YYYYMM  產出幾個月
    let arr = getMonthRangeArr(initYearMonth, 12);
    bookingData.map(booking => {
        const bookingDate = dayjs(booking.date.slice(0, 4) + '-' + booking.date.slice(5, 7) + '-' + booking.date.slice(8, 10))
        if (!arr.includes(bookingDate.format('YYYYMM'))) {
            arr.push(bookingDate.format('YYYYMM'));
        }
        return arr;
    });
    arr = arr.sort();

    let findIndex = arr.indexOf(initYearMonth);

    let details = filterDetials(bookingData, arr[findIndex]);
    SetInitMonthData(arr, findIndex, arr[findIndex], details, bookingData, false);
};

export const filterDetials = (bookingData, activeYYYYMM) => {
    let filteredBookingData = bookingData.filter(booking => {
        const YYYYMM = dayjs(booking.date.slice(0, 4) + '-' + booking.date.slice(5, 7) + '-' + booking.date.slice(8, 10)).format('YYYYMM')
        return YYYYMM === activeYYYYMM;
    });
    let ordered = sortDate(filteredBookingData);
    return ordered;
};

const sortDate = filteredBookingData => {
    let orderDay = filteredBookingData.map((booking, index) => {
        let dd = booking.date.split('/');
        return { dd: dd[2], index: index };
    });

    let noRepeat = JSON.parse(JSON.stringify(orderDay));
    let orderedBookingData = [];

    for (let i = 0; i < orderDay.length; i++) {
        for (let j = 0; j < noRepeat.length; j++) {
            if (orderDay[i].dd === noRepeat[j].dd && orderDay[i].sysTime < noRepeat[j].sysTime) {
                noRepeat.splice(j, 1);
            }
        }
    }
    noRepeat = noRepeat.sort(function(a, b) {
        return a.dd > b.dd ? 1 : -1;
    });
    orderedBookingData = noRepeat.map(obj => {
        return filteredBookingData[obj.index];
    });
    return orderedBookingData;
};

export const checkDate = data => {
    // console.log('data', data);
    let dateRule = /\d{4}\/(?:0[1-9]|[1][012])\/(?:0[1-9]|[1-2][0-9]|3[0-1])/;
    let regExp = new RegExp(dateRule);
    let notVolid = data.some(item => {
        return regExp.test(item.date) === false;
    });
    return notVolid;
};

export const completeMonthArr = (arr, length) => {
    let date;
    if (length === 1) {
        date = arr[0];
    } else if (length === 2) {
        date = arr[1];
    }
    let MonthArr = [];
    let YYYY = date.slice(0, 4);
    let MM = date.slice(4, 6);
    let next = YYYY + (Number(MM) + 1 < 10 ? '0' + (Number(MM) + 1) : Number(MM) + 1);
    let prev = YYYY + (Number(MM) - 1 < 10 ? '0' + (Number(MM) - 1) : Number(MM) - 1);

    if (Number(MM) + 1 > 12) {
        next = Number(YYYY) + 1 + '01';
    } else if (Number(MM) - 1 <= 0) {
        prev = Number(YYYY) - 1 + '12';
    }
    if (length === 1) {
        MonthArr = [prev, date, next];
    } else if (length === 2) {
        MonthArr = [arr[0], date, next];
    }
    return MonthArr;
};

const getMonthRangeArr = (fromYYYYMM, months) => {
    let arr = [fromYYYYMM];
    let YYYY = fromYYYYMM.slice(0, 4);
    let MM = fromYYYYMM.slice(4, 6);
    let basicDate = new Date(dayjs(YYYY + '-' + MM + '-01'));

    let prevDate = basicDate;
    for (let i = 0; i < months; i++) {
        let thisDate = dayjs(prevDate)
            .add(1, 'month')
            .format('YYYY-MM-DD');
        let thisYYYYMM = thisDate.split('-')[0] + thisDate.split('-')[1];
        prevDate = thisYYYYMM;
        arr.push(thisYYYYMM);
    }
    return arr;
};
