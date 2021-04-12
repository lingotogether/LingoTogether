import React, { Fragment, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'

import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import { hendleDBactions } from '../../../actions/handleDB'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { cBoxController, saveBookingData, saveALLMemberData, saveBeadsRecordData } from '../../../actions'
import DeleteIcon from '@material-ui/icons/Delete'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import dayjs from 'dayjs'
import * as firebase from 'firebase/app'
import CancelIcon from '@material-ui/icons/Cancel'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

import { parseTime } from '../../../utils/helpers'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        zIndex: 9999,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

export default function CardWithContent(props) {
    const {
        classLv,
        Title,
        date,
        time,
        maxParticipants,
        PhotoOrVideo,
        Material,
        CreateUserName,
        CreateUserID,
        questions,
        DataID,
        CurrentUser,
        dispatch,
        isAdminAccount,
        whoJoin,
        whoJoinEmail,
        settlement,
        GoogleLink,
        note,
        initALLMemberData
    } = props

    const classes = useStyles()
    const [iwhoJoin, setiWhoJoin] = useState(whoJoin || [])
    const [iwhoJoinEmail, setiWhoJoinEmail] = useState(whoJoinEmail || [])
    const [iSettlement, setiSettlement] = useState(settlement || [])
    const [isJoin, setIsJoin] = useState(false)
    const [isHost, setIsHost] = useState(false)
    const [CanBeUpdated, SetCanBeUpdated] = useState(false)
    const [Editing, setEditing] = useState(false)
    const [iQuestion, setiQuestion] = useState(questions)
    const [iLevel, setiLevel] = useState(classLv)

    const [iTitle, setiTitle] = useState(Title)
    const [iPhotoOrVideo, setiPhotoOrVideo] = useState(
        PhotoOrVideo || 'https://miro.medium.com/max/3600/1*ORHmMQBfcVlNMvW_FOt-uA.png'
    )
    const [iMaterial, setiMaterial] = useState(Material)
    const [iGoogleLink, setiGoogleLink] = useState(GoogleLink);
    const [iNote, setiNote] = useState(note);
    const [iTime, setiTime] = useState(time)
    const [iNumberOfParticipants, setiNumberOfParticipants] = useState(maxParticipants)
    const [AddQuestion, setAddQuestion] = useState([])  
    const [AddQuestionObj, setAddQuestionObj] = useState({})  
    const [QuestionObj] = useState({})

    

    const level = ['B', 'I', 'A']

    const classLvMap = [
		'-Ba-',
		'-In-',
		'-Adv-'
	]    

    useEffect(() => {
        if (CurrentUser && isAdminAccount) {
            setIsHost(true)
            SetCanBeUpdated(true)
        } else {
            if (!CurrentUser) {
                setIsJoin(false)
                setIsHost(false)
                SetCanBeUpdated(false)
            } else {
                if (whoJoin) {
                    let targetI

                    if (whoJoinEmail) {
                        targetI = whoJoinEmail.indexOf(CurrentUser.email)
                    } else {
                        targetI = whoJoin.indexOf(CurrentUser.memberData.UserName)
                    }
                    targetI === -1 ? setIsJoin(false) : setIsJoin(true)
                } else {
                    setIsJoin(false)
                }

                if (CreateUserID === CurrentUser.uid) {
                    SetCanBeUpdated(true)
                    setIsHost(true)
                }
            }
        }
    }, [])

    useEffect(() => {
        // console.log(AddQuestion)
    }, [AddQuestion, AddQuestionObj])

    // 新增 Question 欄位
    const handleAddQuestionCol = e => {
        // 有空白不給新增
        let hasBlank = AddQuestion.indexOf('') === -1 ? false : true

        if (hasBlank) return
        let newArr = AddQuestion.concat([])
        newArr.push('')

        setAddQuestion(newArr)
    }

    const DeleteAddQuestionCol = e => {
        let newArr = AddQuestion.concat([])
        const lastI = newArr.length - 1

        if (window.confirm('Are you sure you want to permanently delete the last Question?')) {
            DeleteTriggerClear(lastI)
        } else {
            return
        }
    }

    const DeleteTriggerClear = i => {
        if (!CurrentUser) return
        AddQuestion.pop()
        let newObj = {}
        for (let i in AddQuestion) {
            newObj[i] = AddQuestion[i]
        }
        setAddQuestionObj(newObj)
        let newArr = []
        Object.keys(newObj).forEach(item => {
            newArr[item] = newObj[item]
        })
        setAddQuestion(newArr)
    }
    const handleInputQuestion = (e, type, i) => {
        const index = type === 'clear' ? i : e.target.getAttribute('name')
        let WhichQusetionObj = type !== 'Add' ? QuestionObj : AddQuestionObj
        WhichQusetionObj[index] = type === 'clear' ? '' : e.target.value

        let newArr = []
        Object.keys(WhichQusetionObj).forEach(item => {
            newArr[item] = WhichQusetionObj[item]
        })

        type === 'Add' ? setAddQuestion(newArr) : setiQuestion(newArr)
    }

    const handleTimeOffset = () => {
        let t = iTime;
        let dd = date;

        let offset = (new Date().getTimezoneOffset() / 60) + 8; // 跟台灣的時差(hr)
        let tempTime = parseInt(t.substring(0, 2)) + offset;
        if(tempTime < 0){
            tempTime += 24;
            let d = new Date(dd);
            let newD = new Date(d.setDate(d.getDate() - 1)).toLocaleDateString();              
            dd = newD;                      
        }
        else if (tempTime > 23) {
            tempTime -= 24;
            let d = new Date(dd);
            let newD = new Date(d.setDate(d.getDate() - 1)).toLocaleDateString();            
            dd = newD;            
        }                
        
        return [dd, tempTime.toString().padStart(2, "0") + "00"];        
    }

    const getTwTime = () => {        
        //time, date已經offset成當地時間丟到此component
        let t = time;
        let dd = date;

        let offset = (new Date().getTimezoneOffset() / 60) + 8; // 跟台灣的時差(hr)
        let tempTime = parseInt(t.substring(0, 2)) + offset;
        if(tempTime < 0){
            tempTime += 24;
            let d = new Date(dd);
            let newD = new Date(d.setDate(d.getDate() - 1)).toLocaleDateString();              
            dd = newD;                      
        }
        else if (tempTime > 23) {
            tempTime -= 24;
            let d = new Date(dd);
            let newD = new Date(d.setDate(d.getDate() - 1)).toLocaleDateString();            
            dd = newD;            
        }                
        
        return [dd, tempTime.toString().padStart(2, "0") + "00"];
    }   
    //console.log(getTwTime()[0]);
    //console.log(getTwTime()[1]); 

    const handleJoinClick = event => {
        if (!CurrentUser) return

        const limit = maxParticipants ? maxParticipants : Number.MAX_VALUE

        const { memberData, email } = CurrentUser
        const { UserName, Bead } = memberData

        let cloneWhoJoin = JSON.parse(JSON.stringify(iwhoJoin))
        let cloneWhoJoinEmail = JSON.parse(JSON.stringify(iwhoJoinEmail))
        let cloneSettlement = JSON.parse(JSON.stringify(iSettlement))
        
        const targetEmail = cloneWhoJoinEmail.indexOf(email)
        const bookingTime = 
            dayjs()
                .year(date.substring(0, 4))
                .month(date.substring(5, 7))
                .date(date.substring(8, 10))
                .subtract(1, 'month')
                .hour(time.substring(0, 2))
                .minute(time.substring(2, 4))
                .second('0');
        const LimitTime = bookingTime.subtract(60, 'minute');// 會議前1小時
        const currentTime = dayjs()
        
        if (!isJoin) {
            if(iwhoJoin.length >= limit) {
                return alert('Max participants');
            }
            else if (Bead < 10){
                return alert('點數不足，請聯絡我們');
            }
            cloneWhoJoin.push(UserName)
            cloneWhoJoinEmail.push(email)
            cloneSettlement.push(false)

            hendleDBactions('beadsRecord',
                currentTime + classLvMap[classLv] + 'deposit-' + CurrentUser.uid, {
                    Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                    Level: classLv,
                    Bead: -10,
                    Title: "Being a participant",
                    Status: "Deposit",
                    FromUserID: "system",
                    ToUserID: CurrentUser.uid,
                }, 'SET',
            )

            hendleDBactions('memberCard',
                email, {                
                    Bead: Bead - 10,
                }, 'UPDATE',
            )
            alert('We received your 10 beads deposit.');
            setIsJoin(true)
        } else {
            if (currentTime.isAfter(LimitTime)){
                return alert("You can't cancel the meeting an hour before it starts");
            }
            
            cloneWhoJoin.splice(targetEmail, 1)
            cloneWhoJoinEmail.splice(targetEmail, 1)
            cloneSettlement.splice(targetEmail, 1)

            hendleDBactions('beadsRecord',
                currentTime + classLvMap[classLv] + 'deposit-' + CurrentUser.uid, {
                    Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                    Level: classLv,
                    Bead: 10,
                    Title: "Being a participant",
                    Status: "Return deposit",
                    FromUserID: "system",
                    ToUserID: CurrentUser.uid,
                }, 'SET',
            )

            hendleDBactions('memberCard',
                email, {                
                    Bead: Bead + 10,
                }, 'UPDATE',
            )
            alert('Your 10 beads deposit has been returned to your account.');
            setIsJoin(false)
        }
        

        const updateOBJ = { whoJoin: cloneWhoJoin, whoJoinEmail: cloneWhoJoinEmail, settlement: cloneSettlement }
        
        hendleDBactions('booking', DataID, updateOBJ, 'UPDATE')

        // hendleDBactions('beadsRecord',
        //     bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[classLv] + 'deposit-' + CurrentUser.uid, {
        //         Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
        //         Level: classLv,
        //         Bead: 10,
        //         Title: "Being a participant",
        //         Status: "Participant punctual",
        //         FromUserID: "system",
        //         ToUserID: participantMemberData.uid,
        //     }, 'SET',
        // )
        
        

        setiWhoJoin(cloneWhoJoin)
        setiWhoJoinEmail(cloneWhoJoinEmail)
        setiSettlement(cloneSettlement)

        // reset DB data
        setTimeout(function() {
            hendleDBactions('booking', '', '', '', resetBookingData)
            hendleDBactions('memberCard', '', '', '', resetMemberData)
            hendleDBactions('beadsRecord', '', {}, '', resetBeadsRecordData)
        }, 3000)
    }
    const resetBookingData = d => {
        dispatch(saveBookingData(d))
    }
    const resetMemberData = d => {
        dispatch(saveALLMemberData(d))
    }
    const resetBeadsRecordData = d => {
        dispatch(saveBeadsRecordData(d))
    }
    const handleInputChange = (e, type) => {
        const { value } = e.currentTarget
        switch (type) {
            case 'title':
                setiTitle(value)
                break
            case 'url':
                setiMaterial(value)
                break
            case 'cover':
                setiPhotoOrVideo(value)
                break
            case 'QArr':
                const index = e.target.getAttribute('name')
                let cloneiQuestion = iQuestion.concat([])
                cloneiQuestion.splice(index, 1, e.target.value)
                setiQuestion(cloneiQuestion)
                break
            case 'googleLink':
                setiGoogleLink(value);
                break;
            case 'note':
                setiNote(value);
                break;
            default:
                return
        }
    }
    const handleDeleteData = () => {
        if (window.confirm('Are you sure you want to permanently delete this data?')) {
            hendleDBactions('booking', DataID, {}, 'DELETE')
            setEditing(false)

            dispatch(cBoxController(false))
            hendleDBactions(
                'memberCard',
                CurrentUser.email,
                {
                    ...CurrentUser.memberData,
                    pendingHost: false,
                },
                'UPDATE'
            )

            setTimeout(function() {
                hendleDBactions('booking', '', '', '', resetBookingData)
                hendleDBactions('memberCard', '', '', '', resetMemberData)
            }, 3000)
        } else {
            alert('Error, please contact to our cuscomer service via Line')
            setEditing(true)
        }
    }

    const handleEditingSave = () => {
        setEditing(false)
        const timeData = handleTimeOffset();

        let totalQ = iQuestion.concat([])
        Object.keys(AddQuestionObj).length > 0 &&
            Object.keys(AddQuestionObj).map(item => {
                totalQ.push(AddQuestionObj[item])
                return item
            })

        hendleDBactions(
            'booking',
            DataID,
            {
                date: timeData[0],
                questions: totalQ,
                Title: iTitle,
                PhotoOrVideo: iPhotoOrVideo,
                Material: iMaterial === undefined ? "" : iMaterial,
                maxParticipants: iNumberOfParticipants,
                time: timeData[1],
                GoogleLink: iGoogleLink,
                note: iNote
            },
            'UPDATE',
            hendleDBactions('booking', '', '', '', resetBookingData)
        )
        //resetBookingData()
        setiLevel(classLv)
    }

    const handleClickEditing = open => {
        if (open) {
            setEditing(true)
            setiLevel('Edit')
        } else {
            setEditing(false)
            setiLevel(classLv)
        }
    }

    const getProperMaxParticipants = maxParticipants => {
        if(maxParticipants === 666) return 'Unlimited'
        return maxParticipants
    }

    const updatePoints = (booking, level, today, e) => {

        if (isAdminAccount) {
            alert('管理員身分：無聊天室之進入限制。')
            window.open(iGoogleLink);
            return
        }

        const isHost = booking.CreateUserID === CurrentUser.uid
        const index = booking.whoJoinEmail.indexOf(CurrentUser.email)

        const twTime = getTwTime();
        const twDate = twTime[0];
        const d = new Date(twDate);
        const twTiming = twTime[1];
        const hour = parseInt(twTiming.substring(0, 2));
        const twDateObject = new Date(d.setHours(d.getHours() + hour + 1));// 取台灣時間延後1小時

        const bookingTime = 
            dayjs()
                .year(booking.date.substring(0, 4))
                .month(booking.date.substring(5, 7))
                .date(booking.date.substring(8, 10))
                .subtract(1, 'month')
                .hour(booking.time.substring(0, 2))
                .minute(booking.time.substring(2, 4))
                .second('0')
        const StartLimitTime = bookingTime.subtract(3, 'minute')
        const LateTime = bookingTime.add(15, 'minute')
        const EndLimitTime = bookingTime.add(20, 'minute')
        const currentTime = dayjs()
        // const currentTime = dayjs().hour(22).minute(17) // For testing

        let status = ""
        // Early
        if (currentTime.isBefore(StartLimitTime)) status = "EARLY"
        // Late
        else if (currentTime.isAfter(LateTime) && currentTime.isBefore(EndLimitTime)) status = "LATE"
        // On time
        else if (currentTime.isAfter(StartLimitTime) && currentTime.isBefore(EndLimitTime)) status = "ON TIME"
        // Absent
        else status = "ABSENT"

        if (status === "EARLY" && today) {
            alert('Please go into the discussion room 3 minutes before it starts.')
            e.preventDefault();
            return;
        }
        else if (status === "ABSENT") {

            // Alert
            if (isHost && !booking.hostSettlement && today) {
                alert('Sorry... You are late for more than 20 minutes...\n \
In this case, system regards you as absent.\n \
We will take 30 beads away from you as a punishment.')                
            }
            else if (booking.settlement !== undefined && !booking.settlement[index] && today) {
                alert('Sorry... You are late for more than 20 minutes...\n \
In this case, system regards you as absent.\n \
We will take 20 beads away from you as a punishment.')                
            }
            else if (today){
                alert('You can\'t enter discussion that started over 20 minutes')                
            } 

            // Settle host and participants who haven't enter discussion yet
            async function settleHostAndParticipants() {

                if (!booking.hostSettlement) {

                    const hostMemberData = initALLMemberData.filter(data => {
                        return data.uid === booking.CreateUserID
                    })[0]

                    // hendleDBactions('beadsRecord',
                    //     bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'absent-' + hostMemberData.uid, {
                    //         Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                    //         Level: booking.classLv,
                    //         Bead: -30,
                    //         Title: "Being a host",
                    //         Status: "Host absent",
                    //         FromUserID: "system",
                    //         ToUserID: booking.CreateUserID,
                    //     }, 'SET',
                    // )

                    // hendleDBactions('memberCard',
                    //     hostMemberData.DataID, {
                    //         ...hostMemberData,
                    //         Bead: hostMemberData.Bead - 30,
                    //     }, 'UPDATE',
                    // )

                    
                    // Insert schedule - beadsRecord
                    hendleDBactions('schedule',
                        bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'beadsRecord-absent-' + hostMemberData.uid, {
                            key: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'beadsRecord-absent-' + hostMemberData.uid,
                            collection: 'beadsRecord',
                            DataID: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'absent-' + hostMemberData.uid,
                            DataObj: {
                                Date: firebase.firestore.Timestamp.fromMillis(bookingTime.add(1, 'hour').valueOf()),
                                Level: booking.classLv,
                                Bead: -30,
                                Title: "Being a host",
                                Status: "Host absent",
                                FromUserID: "system",
                                ToUserID: booking.CreateUserID,
                            },
                            Bead: -30,
                            type: 'SET',
                            executeTime: twDateObject,
                            isExecute: false
                        }, 'SET',
                    )

                    // Insert schedule - memberCard
                    hendleDBactions('schedule',
                        bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'memberCard-absent-' + hostMemberData.uid, {
                            key: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'memberCard-absent-' + hostMemberData.uid,
                            collection: 'memberCard',
                            DataID: hostMemberData.DataID,
                            DataObj: {
                                ...hostMemberData
                            },
                            Bead: -30,// to calculate
                            type: 'UPDATE',
                            executeTime: twDateObject,
                            isExecute: false
                        }, 'SET',
                    )   
                                  

                    hendleDBactions('booking',
                        booking.DataID, {
                            ...booking,
                            hostSettlement: true,
                        }, 'UPDATE',
                    )

                    booking.hostSettlement = true
                    await new Promise(r => setTimeout(r, 3000));
                }

                if (booking.settlement !== undefined) {
                    for (var i = 0; i < booking.settlement.length; i++) {

                        if (!booking.settlement[i]) {
    
                            const participantMemberData = initALLMemberData.filter(data => {
                                return data.Email === booking.whoJoinEmail[i]
                            })[0]
    
                            const hostMemberData = initALLMemberData.filter(data => {
                                return data.uid === booking.CreateUserID
                            })[0]
                            
                            // hendleDBactions('beadsRecord',
                            //     bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'absent-' + participantMemberData.uid, {
                            //         Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                            //         Level: booking.classLv,
                            //         Bead: -30,
                            //         Title: "Being a participant",
                            //         Status: "Participant absent",
                            //         FromUserID: "system",
                            //         ToUserID: participantMemberData.uid,
                            //     }, 'SET',
                            // )
            
                            // hendleDBactions('memberCard',
                            //     participantMemberData.DataID, {
                            //         ...participantMemberData,
                            //         Bead: participantMemberData.Bead - 30,
                            //     }, 'UPDATE',
                            // )
    
                            // Insert schedule - beadsRecord
                            hendleDBactions('schedule',
                                bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'beadsRecord-parti-absent-' + participantMemberData.uid, {
                                    key: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'beadsRecord-parti-absent-' + participantMemberData.uid,
                                    collection: 'beadsRecord',
                                    DataID: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'absent-' + participantMemberData.uid,
                                    DataObj: {
                                        Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                                        Level: booking.classLv,
                                        Bead: -30,
                                        Title: "Being a participant",
                                        Status: "Participant absent",
                                        FromUserID: "system",
                                        ToUserID: participantMemberData.uid,
                                    },
                                    Bead: -30,
                                    type: 'SET',
                                    executeTime: twDateObject,
                                    isExecute: false
                                }, 'SET',
                            )
    
                            // Insert schedule - memberCard
                            hendleDBactions('schedule',
                                bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'memberCard-parti-absent-' + participantMemberData.uid, {
                                    key: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'memberCard-parti-absent-' + participantMemberData.uid,
                                    collection: 'memberCard',
                                    DataID: participantMemberData.DataID,
                                    DataObj: {
                                        ...participantMemberData
                                    },
                                    Bead: -30,// to calculate
                                    type: 'UPDATE',
                                    executeTime: twDateObject,
                                    isExecute: false
                                }, 'SET',
                            )
    
                            // 訂金5點給主持人
                            // hendleDBactions('beadsRecord',
                            //     bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'absent-' + hostMemberData.uid, {
                            //         Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                            //         Level: booking.classLv,
                            //         Bead: 5,
                            //         Title: "Being a host",
                            //         Status: "Participant absent",
                            //         FromUserID: "system",
                            //         ToUserID: booking.CreateUserID,
                            //     }, 'SET',
                            // )
    
                            // hendleDBactions('memberCard',
                            //     hostMemberData.DataID, {
                            //         ...hostMemberData,
                            //         Bead: hostMemberData.Bead + 5,
                            //     }, 'UPDATE',
                            // )
    
                            // 訂金5點給主持人
                            // Insert schedule - beadsRecord
                            hendleDBactions('schedule',
                                bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'beadsRecord-parti-absent-deposit-' + participantMemberData.uid, {
                                    key: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'beadsRecord-parti-absent-deposit-' + participantMemberData.uid,
                                    collection: 'beadsRecord',
                                    DataID: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'absent-' + hostMemberData.uid,
                                    DataObj: {
                                        Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                                        Level: booking.classLv,
                                        Bead: 5,
                                        Title: "Being a host",
                                        Status: "Participant absent",
                                        FromUserID: "system",
                                        ToUserID: booking.CreateUserID,
                                    },
                                    Bead: 5,
                                    type: 'SET',
                                    executeTime: twDateObject,
                                    isExecute: false
                                }, 'SET',
                            )
    
                            // Insert schedule - memberCard
                            hendleDBactions('schedule',
                                bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'memberCard--parti-absent-deposit-' + participantMemberData.uid, {
                                    key: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'memberCard--parti-absent-deposit-' + participantMemberData.uid,
                                    collection: 'memberCard',
                                    DataID: hostMemberData.DataID,
                                    DataObj: {
                                        ...hostMemberData
                                    },
                                    Bead: 5,// to calculate
                                    type: 'UPDATE',
                                    executeTime: twDateObject,
                                    isExecute: false
                                }, 'SET',
                            )
    
            
                            hendleDBactions('booking',
                                booking.DataID, {
                                    ...booking,
                                    settlement: booking.settlement.map((item, j) => {
                                        if (j === i) return true
                                        else return item
                                    }),
                                }, 'UPDATE',
                            )
    
                            booking.settlement[i] = true
                            await new Promise(r => setTimeout(r, 3000));
                        }
                    }
                }                

                hendleDBactions('beadsRecord', '', {}, '', resetBeadsRecordData)
                hendleDBactions('memberCard', '', {}, '', resetMemberData)
                hendleDBactions('booking', '', {}, '', resetBookingData)
            }

            settleHostAndParticipants()
        }
        else {

            if (status === "ON TIME") {

                async function settleHostAndParticipants() {
                    
                    if (isHost && !booking.hostSettlement) {

                        if (today) alert('Great! You are on time!\nYou will get 20 beads as a reward.')

                        const hostMemberData = initALLMemberData.filter(data => {
                            return data.uid === booking.CreateUserID
                        })[0]
    
                        // +20點&10點訂金
                        // hendleDBactions('beadsRecord',
                        //     bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'punctual-' + hostMemberData.uid, {
                        //         Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                        //         Level: booking.classLv,
                        //         Bead: 30,
                        //         Title: "Being a host",
                        //         Status: "Host punctual",
                        //         FromUserID: "system",
                        //         ToUserID: booking.CreateUserID,
                        //     }, 'SET',
                        // )
    
                        // hendleDBactions('memberCard',
                        //     hostMemberData.DataID, {
                        //         ...hostMemberData,
                        //         Bead: hostMemberData.Bead + 30,
                        //     }, 'UPDATE',
                        // )

                        // +20點&10點訂金
                        // Insert schedule - beadsRecord
                        hendleDBactions('schedule',
                            bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'beadsRecord-punctual-' + hostMemberData.uid, {
                                key: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'beadsRecord-punctual-' + hostMemberData.uid,
                                collection: 'beadsRecord',
                                DataID: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'punctual-' + hostMemberData.uid,
                                DataObj: {
                                    Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                                    Level: booking.classLv,
                                    Bead: 30,
                                    Title: "Being a host",
                                    Status: "Host punctual",
                                    FromUserID: "system",
                                    ToUserID: booking.CreateUserID,
                                },
                                Bead: 30,
                                type: 'SET',
                                executeTime: twDateObject,
                                isExecute: false
                            }, 'SET',
                        )

                        // Insert schedule - memberCard
                        hendleDBactions('schedule',
                            bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'memberCard-punctual-' + hostMemberData.uid, {
                                key: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'memberCard-punctual-' + hostMemberData.uid,
                                collection: 'memberCard',
                                DataID: hostMemberData.DataID,
                                DataObj: {
                                    ...hostMemberData
                                },
                                Bead: 30,// to calculate
                                type: 'UPDATE',
                                executeTime: twDateObject,
                                isExecute: false
                            }, 'SET',
                        )
    
                        hendleDBactions('booking',
                            booking.DataID, {
                                ...booking,
                                hostSettlement: true,
                            }, 'UPDATE',
                        )
    
                        booking.hostSettlement = true;
                        await new Promise(r => setTimeout(r, 3000));
                    }
                    else if (booking.settlement !== undefined && !booking.settlement[index]) {

                        if (today) alert('Great! You are on time!\nYou will get 10 beads as a reward.')

                        const participantMemberData = initALLMemberData.filter(data => {
                            return data.Email === booking.whoJoinEmail[index]
                        })[0]
                        
                        // +10點&10點訂金
                        // hendleDBactions('beadsRecord',
                        //     bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'punctual-' + participantMemberData.uid, {
                        //         Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                        //         Level: booking.classLv,
                        //         Bead: 20,
                        //         Title: "Being a participant",
                        //         Status: "Participant punctual",
                        //         FromUserID: "system",
                        //         ToUserID: participantMemberData.uid,
                        //     }, 'SET',
                        // )
        
                        // hendleDBactions('memberCard',
                        //     participantMemberData.DataID, {
                        //         ...participantMemberData,
                        //         Bead: participantMemberData.Bead + 20,
                        //     }, 'UPDATE',
                        // )
                        
                        // +10點&10點訂金
                        // Insert schedule - beadsRecord
                        hendleDBactions('schedule',
                            bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'beadsRecord-punctual-' + participantMemberData.uid, {
                                key: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'beadsRecord-punctual-' + participantMemberData.uid,
                                collection: 'beadsRecord',
                                DataID: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'punctual-' + participantMemberData.uid,
                                DataObj: {
                                    Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                                    Level: booking.classLv,
                                    Bead: 20,
                                    Title: "Being a participant",
                                    Status: "Participant punctual",
                                    FromUserID: "system",
                                    ToUserID: participantMemberData.uid,
                                },
                                Bead: 20,
                                type: 'SET',
                                executeTime: twDateObject,
                                isExecute: false
                            }, 'SET',
                        )

                        // Insert schedule - memberCard
                        hendleDBactions('schedule',
                            bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'memberCard-punctual-' + participantMemberData.uid, {
                                key: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'memberCard-punctual-' + participantMemberData.uid,
                                collection: 'memberCard',
                                DataID: participantMemberData.DataID,
                                DataObj: {
                                    ...participantMemberData
                                },
                                Bead: 20,// to calculate
                                type: 'UPDATE',
                                executeTime: twDateObject,
                                isExecute: false
                            }, 'SET',
                        )
        
                        hendleDBactions('booking',
                            booking.DataID, {
                                ...booking,
                                settlement: booking.settlement.map((item, j) => {
                                    if (j === index) return true
                                    else return item
                                }),
                            }, 'UPDATE',
                        )

                        booking.settlement[index] = true
                        await new Promise(r => setTimeout(r, 3000));
                    }

                    hendleDBactions('beadsRecord', '', {}, '', resetBeadsRecordData)
                    hendleDBactions('memberCard', '', {}, '', resetMemberData)
                    hendleDBactions('booking', '', {}, '', resetBookingData)
                }
                
                settleHostAndParticipants()
            }
            else if (status === "LATE") {

                async function settleHostAndParticipants() {
                    
                    if (isHost && !booking.hostSettlement) {

                        if (today) alert('Oops! You are late for more than 15 minutes...\n \
You can get 20 beads for reward only if you host punctually!')

                        const hostMemberData = initALLMemberData.filter(data => {
                            return data.uid === booking.CreateUserID
                        })[0]
    
                        // 歸還10點訂金
                        // hendleDBactions('beadsRecord',
                        //     bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'tardy-' + hostMemberData.uid, {
                        //         Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                        //         Level: booking.classLv,
                        //         Bead: 10,
                        //         Title: "Being a host",
                        //         Status: "Host tardy & Return deposit",
                        //         FromUserID: "system",
                        //         ToUserID: booking.CreateUserID,
                        //     }, 'SET',
                        // )
    
                        // hendleDBactions('memberCard',
                        //     hostMemberData.DataID, {
                        //         ...hostMemberData,
                        //         Bead: hostMemberData.Bead + 10,
                        //     }, 'UPDATE',
                        // )

                        // 歸還10點訂金
                        // Insert schedule - beadsRecord
                        hendleDBactions('schedule',
                            bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'beadsRecord-tardy-' + hostMemberData.uid, {
                                key: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'beadsRecord-tardy-' + hostMemberData.uid,
                                collection: 'beadsRecord',
                                DataID: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'tardy-' + hostMemberData.uid,
                                DataObj: {
                                    Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                                    Level: booking.classLv,
                                    Bead: 10,
                                    Title: "Being a host",
                                    Status: "Host tardy & Return deposit",
                                    FromUserID: "system",
                                    ToUserID: booking.CreateUserID,
                                },
                                Bead: 10,
                                type: 'SET',
                                executeTime: twDateObject,
                                isExecute: false
                            }, 'SET',
                        )

                        // Insert schedule - memberCard
                        hendleDBactions('schedule',
                            bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'memberCard-tardy-' + hostMemberData.uid, {
                                key: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'memberCard-tardy-' + hostMemberData.uid,
                                collection: 'memberCard',
                                DataID: hostMemberData.DataID,
                                DataObj: {
                                    ...hostMemberData
                                },
                                Bead: 10,// to calculate
                                type: 'UPDATE',
                                executeTime: twDateObject,
                                isExecute: false
                            }, 'SET',
                        )
    
                        hendleDBactions('booking',
                            booking.DataID, {
                                ...booking,
                                hostSettlement: true,
                            }, 'UPDATE',
                        )
    
                        booking.hostSettlement = true
                        await new Promise(r => setTimeout(r, 3000));
                    }
                    else if (booking.settlement !== undefined && !booking.settlement[index]) {

                        if (today) alert('Oops! You are late for more than 15 minutes...\n \
You can get 10 beads for reward only if you participate punctually!')

                        const participantMemberData = initALLMemberData.filter(data => {
                            return data.Email === booking.whoJoinEmail[index]
                        })[0]
                        
                        // 歸還10點訂金
                        // hendleDBactions('beadsRecord',
                        //     bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'tardy-' + participantMemberData.uid, {
                        //         Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                        //         Level: booking.classLv,
                        //         Bead: 10,
                        //         Title: "Being a participant",
                        //         Status: "Participant tardy & Return deposit",
                        //         FromUserID: "system",
                        //         ToUserID: participantMemberData.uid,
                        //     }, 'SET',
                        // )
        
                        // hendleDBactions('memberCard',
                        //     participantMemberData.DataID, {
                        //         ...participantMemberData,
                        //         Bead: participantMemberData.Bead + 10,
                        //     }, 'UPDATE',
                        // )

                        // 歸還10點訂金
                        // Insert schedule - beadsRecord
                        hendleDBactions('schedule',
                            bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'beadsRecord-tardy-' + participantMemberData.uid, {
                                key: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'beadsRecord-tardy-' + participantMemberData.uid,
                                collection: 'beadsRecord',
                                DataID: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'tardy-' + participantMemberData.uid,
                                DataObj: {
                                    Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                                    Level: booking.classLv,
                                    Bead: 10,
                                    Title: "Being a participant",
                                    Status: "Participant tardy & Return deposit",
                                    FromUserID: "system",
                                    ToUserID: participantMemberData.uid,
                                },
                                Bead: 10,
                                type: 'SET',
                                executeTime: twDateObject,
                                isExecute: false
                            }, 'SET',
                        )

                        // Insert schedule - memberCard
                        hendleDBactions('schedule',
                            bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'memberCard-tardy-' + participantMemberData.uid, {
                                key: bookingTime.format('YYYYMMDD-HHmmss') + classLvMap[booking.classLv] + 'memberCard-tardy-' + participantMemberData.uid,
                                collection: 'memberCard',
                                DataID: participantMemberData.DataID,
                                DataObj: {
                                    ...participantMemberData
                                },
                                Bead: 10,// to calculate
                                type: 'UPDATE',
                                executeTime: twDateObject,
                                isExecute: false
                            }, 'SET',
                        )
        
                        hendleDBactions('booking',
                            booking.DataID, {
                                ...booking,
                                settlement: booking.settlement.map((item, j) => {
                                    if (j === index) return true
                                    else return item
                                }),
                            }, 'UPDATE',
                        )

                        booking.settlement[index] = true
                        await new Promise(r => setTimeout(r, 3000));
                    }

                    hendleDBactions('beadsRecord', '', {}, '', resetBeadsRecordData)
                    hendleDBactions('memberCard', '', {}, '', resetMemberData)
                    hendleDBactions('booking', '', {}, '', resetBookingData)
                }
                
                settleHostAndParticipants()
            }
            
            if (today)
                var mywin = window.open('_blank', "redirect");
                mywin.open(iGoogleLink, "redirect");
                //if (window.confirm('Please remember to LEAVE the room after your discussion!')){
                    
                //}
                    //window.open(skRoomUrl[level])
        }
        dispatch(cBoxController(false));

        return
    }

    // Click the link of Goolge Meet
    const googleMeetOnclick = (e, level) => {
        
        
        e.preventDefault();
        // Beads rewarding
        hendleDBactions(
            'booking',
            '',
            {
                date: date,
                level: level
            },
            'getBookingByDateAndLevel',
            booking => {                                                
                
                if (isAdminAccount) updatePoints(booking, level, true, e)
                else if (booking.noData)
                    alert('今天沒有這個難度的讀書會喔！\nThere\'s no discussion of this level today!')
                else if (booking.CreateUserID !== CurrentUser.uid && booking.whoJoinEmail.indexOf(CurrentUser.email) === -1) 
                    alert('您並沒有報名這場讀書會喔～\nYou didn\'t join this discussion so you are not allowed to get in~')
                else {
                    const isHost = booking.CreateUserID === CurrentUser.uid
                    if (!isJoin && !isHost){
                        alert("You need to click the “join” before  entering  the discussion room.");                    
                    }
                    
                    updatePoints(booking, level, true, e)
                } 
            }
        )

        // Check for last discussion's reward settlements
        // hendleDBactions(
        //     'booking',
        //     '',
        //     date,
        //     'getLastBookingBeforeDate',
        //     booking => {
        //         if (booking.noData) return
        //         updatePoints(booking, level, false, e)
        //     }
        // )
    }

    const iconclassName =
        props.classLv === 0
            ? 'AvatarIcon green'
            : props.classLv === 2
            ? 'AvatarIcon yellow'
            : 'AvatarIcon'

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={iconclassName}>
                        {level[iLevel]}
                    </Avatar>
                }
                title={
                    !Editing ? (
                        <a 
                            href={iMaterial} 
                            style={{ color: 'rgba(0, 0, 0, 0.87)' }}
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            { iTitle }
                        </a>
                    ) : (
                        <TextField
                            key={`CardTitleEditing`}
                            defaultValue={Title}
                            label={`Title`}
                            margin="normal"
                            multiline
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e, i) => handleInputChange(e, 'title')}
                        />
                    )
                }
                subheader={`${date} ${parseTime(time)}`}
            />
            {isHost ? null : (
                <Fragment>
                    <label className="container">
                        Join
                        <input
                            name="isJoin"
                            type="checkbox"
                            checked={isJoin}
                            onChange={handleJoinClick}
                        />
                        <span className="checkmark"></span>
                    </label>
                </Fragment>
            )}
            {CanBeUpdated ? (
                <div className="updateTools">
                    <Fab
                        color="secondary"
                        aria-label="edit"
                        size="small"
                        onClick={() => handleClickEditing(true)}
                    >
                        <EditIcon />
                    </Fab>
                    <Fab aria-label="edit" size="small" onClick={() => handleDeleteData(true)}>
                        <DeleteIcon />
                    </Fab>
                </div>
            ) : null}

            {!Editing ? (
                <div className="NotEdtingCardContent">
                    <CardContent>
                        <div className="iMaterial">
                            <span className="CardLabel">{`Material: `}</span>
                            <a href={iMaterial} target="_blank" rel="noopener noreferrer">
                                {iMaterial}{' '}
                            </a>
                        </div>
                    </CardContent>
                    <CardContent>
                        <div className="iGoogleLink">
                            <span className="CardLabel">{`Google Meet: `}</span>
                            <a href={iGoogleLink} target="_blank" rel="noopener noreferrer" 
                                onClick={e => {
                                    googleMeetOnclick(e, iLevel);                                                                       
                                }}
                            >
                                {iGoogleLink}{' '}
                                
                            </a>
                        </div>
                    </CardContent>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{width: '50%'}}>
                            <CardContent>
                                <div className="ParticipantText">
                                    <span className="CardLabel">Host:</span> {CreateUserName}
                                </div>
                            </CardContent>
                            <CardContent>
                                <div className="ParticipantText">
                                    <span className="CardLabel"># of participants: </span> {getProperMaxParticipants(iNumberOfParticipants) || '(None)'}
                                </div>
                            </CardContent>
                            <CardContent>
                                <div className="ParticipantText">
                                    <span className="CardLabel">Participants: </span> {iwhoJoin.join(', ')}
                                </div>
                            </CardContent>
                        </div>
                        <div style={{width: '50%'}}>
                            <TextareaAutosize aria-label="minimum height" rowsMin={5} value={note}
                                style={{width: '250px', height: '90px', resize: 'none', overflowY: 'scroll'}}
                                readOnly
                            />
                        </div>
                    </div>
                    
                </div>
            ) : (
                <div className="EdtingCardContent">
                    <div style={{display: 'flex'}}>
                        <div>
                            <InputLabel key={'FormControl_time'} id="demo-simple-select-outlined-label">
                                Time:
                            </InputLabel>
                            <div style={{ marginBottom: '10px' }}>
                                <select 
                                    name="classLevel"
                                    key="classLevel"
                                    value={iTime.substring(0, 2)}
                                    onChange={e => setiTime(`${e.target.value}00`)}
                                >
                                    <option value="00">12:00 am</option>
                                    <option value="01">1:00 am</option>
                                    <option value="02">2:00 am</option>
                                    <option value="03">3:00 am</option>
                                    <option value="04">4:00 am</option>
                                    <option value="05">5:00 am</option>
                                    <option value="06">6:00 am</option>
                                    <option value="07">7:00 am</option>
                                    <option value="08">8:00 am</option>
                                    <option value="09">9:00 am</option>
                                    <option value="10">10:00 am</option>
                                    <option value="11">11:00 am</option>
                                    <option value="12">12:00 pm</option>
                                    <option value="13">1:00 pm</option>
                                    <option value="14">2:00 pm</option>
                                    <option value="15">3:00 pm</option>
                                    <option value="16">4:00 pm</option>
                                    <option value="17">5:00 pm</option>
                                    <option value="18">6:00 pm</option>
                                    <option value="19">7:00 pm</option>
                                    <option value="20">8:00 pm</option>
                                    <option value="21">9:00 pm</option>
                                    <option value="22">10:00 pm</option>
                                    <option value="23">11:00 pm</option>
                                </select>                 
                            </div>

                            <InputLabel key={'FormControl_num_of_participants'} id="demo-simple-select-outlined-label">
                                Number of participants: 
                            </InputLabel>
                            <div style={{ marginBottom: '10px' }}>
                                <select 
                                    name="classLevel"
                                    key="classLevel"
                                    value={iNumberOfParticipants}
                                    onChange={e => setiNumberOfParticipants(parseInt(e.target.value))}
                                >
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="666">Unlimited</option>
                                </select>                 
                            </div>
                        </div>
                        <div style={{marginLeft: '50px'}}>
                            <TextareaAutosize aria-label="minimum height" rowsMin={5} value={iNote}
                                style={{width: '250px', height: '90px', resize: 'none', overflowY: 'scroll'}}
                                onChange={e => {
                                    handleInputChange(e, 'note');
                                }}
                            />
                        </div>
                    </div>

                    
                    <TextField
                        key={`CardUrl`}
                        label={`URL`}
                        placeholder="Please provide the link of your material"
                        fullWidth
                        multiline
                        defaultValue={iMaterial}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e, i) => handleInputChange(e, 'url')}
                    />
                    <TextField
                        key={`CardGoogleLink`}
                        label={`Google Meet`}
                        placeholder="Please provide the link of your meeting"
                        fullWidth
                        multiline
                        defaultValue={iGoogleLink}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e, i) => handleInputChange(e, 'googleLink')}
                    />

                    <div className={'cardQuestion'}>
                        <div>
                            {iQuestion.map((item, i) => {
                                return (
                                    <TextField
                                        key={`Questiion${i + 1}`}
                                        label={`Questiion${i + 1}`}
                                        placeholder="Please provide at least 3 questions"
                                        defaultValue={item}
                                        fullWidth
                                        multiline
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                        name={i.toString()}
                                        onChange={e => {
                                            handleInputChange(e, 'QArr')
                                        }}
                                    />
                                )
                            })}
                        </div>
                        <div className="AddedQCols">
                            {AddQuestion.map((item, i) => {
                                return (
                                    <Fragment>
                                        <TextField
                                            key={`Questiion${i + 4}`}
                                            label={`Questiion${i + 4}`}
                                            style={{ margin: 8, paddingRight: '37px' }}
                                            defaultValue={item}
                                            fullWidth
                                            multiline
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={AddQuestion[i]}
                                            required
                                            name={i.toString()}
                                            onChange={e => {
                                                handleInputQuestion(e, 'Add')
                                            }}
                                            // inputRef={AddCol_Ref}
                                        />
                                    </Fragment>
                                )
                            })}
                        </div>
                        {AddQuestion.length > 0 ? (
                            <CancelIcon
                                onClick={e => {
                                    DeleteAddQuestionCol(e)
                                }}
                            ></CancelIcon>
                        ) : null}
                        <AddCircleOutlineIcon
                            onClick={e => {
                                handleAddQuestionCol(e)
                            }}
                        ></AddCircleOutlineIcon>
                        
                    </div>
                    <div className="btnLineParent">
                        <div className="btnLine">
                            <div className="btnLineUnit save">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={() => handleEditingSave()}
                                >
                                    Save
                                </Button>
                            </div>
                            <div className="btnLineUnit clear">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={() => handleClickEditing(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>                    
                </div>
            )}

            {Editing ? null : (
                <CardContent>
                    <Typography paragraph>
                        <span className="CardLabel">Questions:</span>{' '}
                    </Typography>
                    <ul>
                        {iQuestion.map((item, i) => {
                            return <li paragraph key={`readMore${i}`}>{`${i + 1}. ${item}`}</li>
                        })}
                    </ul>
                </CardContent>
            )}
        </Card>
    )
}
