import React, { Fragment, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import { red } from '@material-ui/core/colors'
import { hendleDBactions } from '../../../actions/handleDB'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import { cBoxController, saveBookingData, saveALLMemberData, saveBeadsRecordData } from '../../../actions'
import ClearIcon from '@material-ui/icons/Clear'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import CancelIcon from '@material-ui/icons/Cancel'
import InputLabel from '@material-ui/core/InputLabel'
import dayjs from 'dayjs'
import { parseTime } from '../../../utils/helpers'
import { timeOptions, participantsOptions } from '../../../utils/options'
import VideocamIcon from '@material-ui/icons/Videocam';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import * as firebase from 'firebase/app'

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
}))

const CardNoContent = (props) => {
    const { 
        Status, Title, date, PhotoOrVideo, Material, 
        questions, CurrentUser, dispatch, initBookingData
    } = props

    const classes = useStyles()

    const [Editing, setEditing] = useState(false)
    const defaultQuestion = ['', '', '']
    const [iQuestion, setiQuestion] = useState(questions || defaultQuestion)
    const [iStatus, setiStatus] = useState(Status)
    const [QuestionObj] = useState({})
    const [AddQuestionObj, setAddQuestionObj] = useState({})
    const [iTitle, setiTitle] = useState(Title)
    const [iPhotoOrVideo, setiPhotoOrVideo] = useState(
        PhotoOrVideo || 'https://miro.medium.com/max/3600/1*ORHmMQBfcVlNMvW_FOt-uA.png'
    )
    const [iMaterial, setiMaterial] = useState(Material)
    const [AddQuestion, setAddQuestion] = useState([])
    const [iGoogleLink, setiGoogleLink] = useState();
    const [iNote, setiNote] = useState();

    const [timing, setTiming] = useState('2200')
    const [selectLevel, setSelectLevel] = useState(1)
    const [numberOfParticipants, setNumberOfParticipants] = useState(0)

    const handleSelectLevel = e => {
        setSelectLevel(Number(e.target.value))
    }

    useEffect(() => {
        // console.log(AddQuestion)
    }, [AddQuestion, AddQuestionObj])

    console.log(CurrentUser);
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
                let newArr = []
                const index = e.target.getAttribute('name')

                newArr.splice(index, 1, e.target.value)

                setiQuestion(newArr)
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

    const handleEditingSave = () => {
        let DataId = date.split('/').join('') + '-' + timing + '-' + CurrentUser.uid + selectLevel
        let isysTime = new Date(dayjs())
        const bookings = initBookingData || []
        const thisDateBookings = bookings.filter(booking => booking.date === date)

        //Section limit check (three per date)
        if(thisDateBookings.length >= 3) {
            return alert('There are already have three sections today.')
        }

        //Class level conflict check
        if(thisDateBookings.map(booking => booking.classLv).includes(selectLevel)) {
            return alert('This level has already been taken.')
        }

        setEditing(false)

        let totalQ = iQuestion.concat([])
        Object.keys(AddQuestionObj).length > 0 &&
            Object.keys(AddQuestionObj).map(item => {
                totalQ.push(AddQuestionObj[item])
                return item
            })

        const timeData = handleTimeOffset();  
        const currentTime = dayjs()   
        const bookingTime = 
            dayjs()
                .year(timeData[0].substring(0, 4))
                .month(timeData[0].substring(5, 7))
                .date(timeData[0].substring(8, 10))
                .subtract(1, 'month')
                .hour(timeData[1].substring(0, 2))
                .minute(timeData[1].substring(2, 4))
                .second('0');   

        hendleDBactions(
            'booking',
            DataId,
            {
                CreateUserID: CurrentUser.uid,
                CreateUserName: CurrentUser.memberData.UserName,
                date: timeData[0],
                questions: totalQ,
                Title: iTitle,
                PhotoOrVideo: iPhotoOrVideo,
                Material: iMaterial === undefined ? "" : iMaterial,
                time: timeData[1],
                maxParticipants: numberOfParticipants,
                sysTime: isysTime,
                hostSettlement: false,
                whoJoin: [],
                whoJoinEmail: [],
                GoogleLink: iGoogleLink,
                note: iNote,
                classLv: selectLevel,
            },
            'SET'
        )

        hendleDBactions('beadsRecord',
            currentTime + selectLevel + 'deposit-' + CurrentUser.uid, {
                Date: firebase.firestore.Timestamp.fromMillis(bookingTime.valueOf()),
                Level: selectLevel,
                Bead: -10,
                Title: "Being a host",
                Status: "Deposit",
                FromUserID: "system",
                ToUserID: CurrentUser.uid,
            }, 'SET',
        )

        hendleDBactions('memberCard',
            CurrentUser.email, {                
                Bead: CurrentUser.Bead - 10,
            }, 'UPDATE',
        )
        alert('We received your 10 beads deposit.');

        dispatch(cBoxController(false))
        hendleDBactions('booking', '', '', '', resetBookingData)
        hendleDBactions('memberCard', '', '', '', resetMemberData)
        hendleDBactions('beadsRecord', '', {}, '', resetBeadsRecordData)

        setiStatus(Status)
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
    const handleClickEditing = open => {
        if (!CurrentUser) return
        dispatch(cBoxController(false))
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

    const handleTimeOffset = () => {
        let t = timing;
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

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        Edit
                    </Avatar>
                }
                action={
                    <IconButton
                        aria-label="settings"
                        disableFocusRipple
                        disableRipple
                        color={'secondary'}
                    >
                        <ThumbUpIcon />
                        Host
                    </IconButton>
                }
                title={
                    <TextField
                        key={`CardTitleEditing`}
                        defaultValue={Title}
                        label={`Title`}
                        margin="normal"
                        multiline
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e, i) => handleInputChange(e, 'title')}
                    />
                }
                //subheader={`${date} ${parseTime(timing)}`}
            />
            <div className="EdtingCardContent">
                <TextField
                    key={`CardUrl`}
                    label={`URL`}
                    style={{ margin: 8 }}
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

                <div className="GoogleMeet">
                    <TextField
                        key={`CardGoogleMeet`}
                        label={`Google Meet`}
                        style={{ margin: 8, paddingRight: '37px' }}
                        placeholder="Please provide the link of your meeting"
                        fullWidth
                        multiline                    
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e, i) => handleInputChange(e, 'googleLink')}
                    />
                    <VideocamIcon 
                        className="meetBtn"
                        key={`GoogleMeetBtn`}
                        onClick={e => {
                            window.open('https://meet.google.com/');
                        }}
                    >                        
                    </VideocamIcon>

                </div>
                
                <div className={'levelSection'}>
                    <div>
                        <div className={'levelSelector'}>
                            <InputLabel key={'FormControl8'} id="demo-simple-select-outlined-label">
                                Level
                            </InputLabel>

                            <select
                                name="classLevel"
                                onChange={e => handleSelectLevel(e)}
                                value={selectLevel}
                                key="classLevel"
                            >
                                <option value={0} key="Basic">
                                    Basic 初級
                                </option>
                                <option value={1} key="Intermediate">
                                    Intermediate 中級
                                </option>
                                <option value={2} key="Advanced">
                                    Advanced 進階
                                </option>
                            </select>
                        </div>

                        <div className={'levelSelector'}>
                            <InputLabel key={'FormControl8'} id="demo-simple-select-outlined-label">
                                Time
                            </InputLabel>

                            <select 
                                name="classLevel"
                                key="classLevel"
                                onChange={e => setTiming(`${e.target.value}00`)}
                            >
                            {
                                timeOptions.map((timeOption, index) => {

                                    const indexStr = index.toString()
                                    const value = 
                                        indexStr.length === 1 
                                        ? `0${indexStr}`
                                        : indexStr

                                    return (
                                        <option key={index} value={value}>
                                            {timeOption}
                                        </option>
                                    )
                                })
                            }
                            </select>
                        </div>

                        <div className={'levelSelector'}>
                            <InputLabel key={'FormControl8'} id="demo-simple-select-outlined-label">
                                Number of participants: 
                            </InputLabel>

                            <select 
                                name="classLevel"
                                key="classLevel"
                                onChange={e => setNumberOfParticipants(parseInt(e.target.value))}
                            >
                            {
                                participantsOptions.map((option, index) => {
                                    return (
                                        <option key={index} value={option}>
                                        {
                                            option === '666'
                                            ? 'Unlimited'
                                            : option
                                        }
                                        </option>
                                    )
                                })
                            }
                            </select>                 
                        </div>
                    </div>

                    <TextareaAutosize aria-label="minimum height" rowsMin={5} placeholder="Would you like to say something ? :)"
                        style={{width: '250px', height: '90px', resize: 'none', overflowY: 'scroll'}}
                        onChange={e => {
                            handleInputChange(e, 'note');
                        }}
                    />

                    
                </div>

                

                

                <div className={'cardQuestion'}>
                    <div className="QCols">
                        {defaultQuestion.map((item, i) => {
                            return (
                                <div key={i} className="QColsChild">
                                    <TextField
                                        key={`Questiion${i + 1}`}
                                        label={`Questiion${i + 1}`}
                                        style={{ margin: 8, paddingRight: '37px' }}
                                        placeholder="Please provide your question here"
                                        defaultValue={item}
                                        fullWidth
                                        multiline
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={iQuestion[i]}
                                        required
                                        name={i.toString()}
                                        onChange={e => {
                                            handleInputQuestion(e)
                                        }}
                                    />
                                    <ClearIcon
                                        className="QcolCloseBtn"
                                        key={`ClearIcon${i + 1}`}
                                        onClick={e => {
                                            handleInputQuestion(e, 'clear', i)
                                        }}
                                    ></ClearIcon>
                                </div>
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
        </Card>
    )
}

export default CardNoContent
