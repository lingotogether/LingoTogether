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
import { cBoxController, saveBookingData, saveALLMemberData } from '../../../actions'
import ClearIcon from '@material-ui/icons/Clear'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import CancelIcon from '@material-ui/icons/Cancel'
import InputLabel from '@material-ui/core/InputLabel'
import dayjs from 'dayjs'
import { parseTime } from '../../../utils/helpers'
import { timeOptions, participantsOptions } from '../../../utils/options'

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
        questions, CurrentUser, dispatch
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

    const [timing, setTiming] = useState('2200')
    const [selectLevel, setSelectLevel] = useState(1)
    const [numberOfParticipants, setNumberOfParticipants] = useState(0)

    const handleSelectLevel = e => {
        setSelectLevel(Number(e.target.value))
    }

    useEffect(() => {
        console.log(AddQuestion)
    }, [AddQuestion, AddQuestionObj])

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
            default:
                return
        }
    }

    const handleEditingSave = () => {
        let DataId = date.split('/').join('') + '-' + timing + '-' + CurrentUser.uid
        let isysTime = new Date(dayjs())

        setEditing(false)

        let totalQ = iQuestion.concat([])
        Object.keys(AddQuestionObj).length > 0 &&
            Object.keys(AddQuestionObj).map(item => {
                totalQ.push(AddQuestionObj[item])
                return item
            })

        hendleDBactions(
            'booking',
            DataId,
            {
                CreateUserID: CurrentUser.uid,
                CreateUserName: CurrentUser.memberData.UserName,
                date: date,
                questions: totalQ,
                Title: iTitle,
                PhotoOrVideo: iPhotoOrVideo,
                Material: iMaterial,
                time: timing,
                maxParticipants: numberOfParticipants,
                sysTime: isysTime,
                isHost: true,
                classLv: selectLevel,
            },
            'SET'
        )

        dispatch(cBoxController(false))
        hendleDBactions('booking', '', '', '', resetBookingData)
        hendleDBactions('memberCard', '', '', '', resetMemberData)

        setiStatus(Status)
    }

    const resetBookingData = d => {
        console.log(748998713)
        dispatch(saveBookingData(d))
    }
    const resetMemberData = d => {
        console.log(748998713)
        dispatch(saveALLMemberData(d))
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

    // 新增Question欄位
    const handleAddQuestionCol = e => {
        //有空白不給新增
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
                subheader={`${date} ${parseTime(timing)}`}
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

                <div className={'cardQuestion'}>
                    <div className="QCols">
                        {defaultQuestion.map((item, i) => {
                            return (
                                <div key={i} className="QColsChild">
                                    <TextField
                                        key={`Questiion${i + 1}`}
                                        label={`Questiion${i + 1}`}
                                        style={{ margin: 8, paddingRight: '37px' }}
                                        placeholder="Please provide at least 3 questions"
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
