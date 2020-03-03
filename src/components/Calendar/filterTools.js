import dayjs from 'dayjs';
export const filterMonthsWithData = (data, initYearMonth, SetInitMonthData) => {
    //deal with Month range
    getMonthRangeArr(initYearMonth, 12); // 填充月份 起始年月YYYYMM  產出幾個月
    let arr = getMonthRangeArr(initYearMonth, 12);
    // let arr = [];
    data.map(item => {
        if (!arr.includes(item.date.slice(0, 4) + item.date.slice(5, 7))) {
            arr.push(item.date.slice(0, 4) + item.date.slice(5, 7));
        }
        return arr;
    });
    arr = arr.sort();

    let findIndex = arr.indexOf(initYearMonth);

    let details = filterDetials(data, arr[findIndex]);
    SetInitMonthData(arr, findIndex, arr[findIndex], details, data, false);
};
export const filterDetials = (data, activeM) => {
    let details = data.filter(item => {
        let YYYYMM = item.date.slice(0, 4) + item.date.slice(5, 7);

        return YYYYMM === activeM;
    });
    let ordered = sortDate(details);
    return ordered;
};

const sortDate = details => {
    let orderDay = details.map((obj, index) => {
        let dd = obj.date.split('/');
        return { dd: dd[2], index, price: obj.price };
    });

    let noRepeat = JSON.parse(JSON.stringify(orderDay));
    let orderDetail = [];

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
    orderDetail = noRepeat.map(obj => {
        return details[obj.index];
    });
    return orderDetail;
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
