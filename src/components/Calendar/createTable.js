import React from 'react'
import { parseTime } from '../../utils/helpers'

const level = ['Ba.', 'In.', 'Adv.']
export const CreateTable = (
    activeYYYYMM,
    ThisMonthDetails,
    activeID,
    isList,
    weekday,
    onClickDate
) => {
    if (!activeYYYYMM) {
        return
    } else {
        let table = []
        let lastD = new Date(activeYYYYMM.slice(0, 4), activeYYYYMM.slice(4, 7), 0)
        let firstD = new Date(activeYYYYMM.slice(0, 4), activeYYYYMM.slice(4, 7) - 1, 1)
        let totalD = lastD.getDate()
        let firstD_W = firstD.getDay()
        //第一行補灰格
        for (let i = 0; i < firstD_W; i++) {
            table.push(
                <li
                    key={'blankP' + i}
                    className={`oneDate ${isList ? 'noShow' : 'calendars_daymode'}  gray-blank`}
                    id={'blank' + i}
                />
            )
        }
        // 日期資料
        for (let i = 1; i < totalD + 1; i++) {
            let hasDetail = false
            let saveJ
            let saveJArray = []
            for (let j = 0; j < ThisMonthDetails.length; j++) {
                //和本月資料比對是否有相同
                let hasDate = Number(ThisMonthDetails[j].date.split('/')[2])
                if (hasDate === i) {
                    hasDetail = true
                    saveJ = j
                    saveJArray.push(j)
                }
            }
            saveJArray.sort((a, b) => ThisMonthDetails[a].time - ThisMonthDetails[b].time)
            if (hasDetail) {
                let W = new Date(ThisMonthDetails[saveJ].date).getDay()
                let thisDD = activeYYYYMM.slice(0, 4) + '/' + activeYYYYMM.slice(4, 7) + '/' + (i < 10 ? '0' + i : i)
                table.push(
                    <li
                        className={`oneDate  ${activeID === i ? 'active' : ''} ${
                            isList ? 'calendars_listmode' : 'calendars_daymode'
                        } hasDate`}
                        key={`date${i}`}
                        id={i}
                    >
                        <div className="inner-li">
                            <div 
                                className="li-left"
                                onClick={e => onClickDate(e, thisDD)}
                            >
                                {Number(i)}
                                <span className="weekday">{`${isList ? weekday[W] : ''}`}</span>
                            </div>
                            <div className="li-middle">
                                <div className="content">
                                {
                                    saveJArray.map((thisDate, index) => {
                                        let item = ThisMonthDetails[thisDate]
                                        return (
                                            <span
                                                className="content-item"
                                                data-index={thisDate}
                                                onClick={e => onClickDate(e)}
                                                key={index}
                                            >
                                                <div
                                                    className={`btn-deco 
                                                    ${item.classLv === 0 ? 'green' : ''}  
                                                    ${item.classLv === 2 ? 'yellow' : ''}`}
                                                >
                                                    {level[item.classLv]}
                                                </div>{' '}
                                                {
                                                    isList 
                                                    ? `[${item.CreateUserName}] ${parseTime(item.time)} ${item.Title}`
                                                    : parseTime(item.time)
                                                }
                                            </span>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        </div>
                    </li>
                )
            } else {
                let dd = i < 10 ? '0' + i : i
                let thisDD = activeYYYYMM.slice(0, 4) + '/' + activeYYYYMM.slice(4, 7) + '/' + dd
                table.push(
                    <li
                        key={'blank' + i}
                        className={`oneDate ${isList ? 'noShow' : 'calendars_daymode'} `}
                        id={i}
                        onClick={e => onClickDate(e, thisDD)}
                    >
                        <div className="inner-li">
                            <div className="li-left">
                                <span className="no">{i} </span>
                            </div>
                        </div>
                    </li>
                )
            }
        }
        let addSome = 42 - firstD_W - totalD
        for (let i = 0; i < addSome; i++) {
            table.push(
                <li
                    key={'blankB' + totalD + i}
                    className={`oneDate ${isList ? 'noShow' : 'calendars_daymode'}  gray-blank`}
                />
            )
            //}
        }
        return table
    }
}

export const createMonthBar = (
    monthBarArr,
    currentYearMonthIndex,
    activeYYYYMM,
    clickMonth,
    monthNames,
    CurrentUser
) => {
    if (monthBarArr.length === 0) {
        return
    } else {
        let prevM = currentYearMonthIndex - 1
        let nextM = currentYearMonthIndex + 2
        if (currentYearMonthIndex - 1 < 0) {
            prevM = 0
            nextM = 3
        } else if (currentYearMonthIndex + 2 > monthBarArr.length) {
            prevM = monthBarArr.length - 3
            nextM = monthBarArr.length
        }

        let monthBar = []
        for (let i = prevM; i < nextM; i++) {
            let YYYY = monthBarArr[i].slice(0, 4)
            let MM = monthBarArr[i].slice(4, 7)
            monthBar.push(
                <li
                    className={`tab ${activeYYYYMM === YYYY + MM ? 'activeM' : ''} ${
                        !CurrentUser && i !== 0 ? 'displayNone' : ''
                    }`}
                    key={'tab' + i}
                    id={YYYY + MM}
                    onClick={e => clickMonth(e)}
                >
                    <a>
                        <span>
                            {YYYY} {monthNames[MM - 1]}
                        </span>
                    </a>
                </li>
            )
        }

        return <ul className={`ntb_tab `}> {monthBar} </ul>
    }
}

export const createWeekTable = weekday => {
    let table = []
    weekday.forEach((day, i) => {
        let a = <li key={`dayi` + i}>{day}</li>
        table.push(a)
    })
    return table
}
