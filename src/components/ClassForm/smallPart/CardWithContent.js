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
import { cBoxController, saveBookingData, saveALLMemberData } from '../../../actions'
import DeleteIcon from '@material-ui/icons/Delete'

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
    const [iTime, setiTime] = useState(time)
    const [iNumberOfParticipants, setiNumberOfParticipants] = useState(maxParticipants)


    const level = ['B', 'I', 'A']

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

    const handleJoinClick = event => {
        if (!CurrentUser) return

        const limit = maxParticipants ? maxParticipants : Number.MAX_VALUE

        const { memberData, email } = CurrentUser
        const { UserName } = memberData

        let cloneWhoJoin = JSON.parse(JSON.stringify(iwhoJoin))
        let cloneWhoJoinEmail = JSON.parse(JSON.stringify(iwhoJoinEmail))
        let cloneSettlement = JSON.parse(JSON.stringify(iSettlement))
        
        const targetEmail = cloneWhoJoinEmail.indexOf(email)

        if (!isJoin) {
            if(iwhoJoin.length >= limit) {
                return alert('Max participants')
            }
            cloneWhoJoin.push(UserName)
            cloneWhoJoinEmail.push(email)
            cloneSettlement.push(false)
            setIsJoin(true)
        } else {
            cloneWhoJoin.splice(targetEmail, 1)
            cloneWhoJoinEmail.splice(targetEmail, 1)
            cloneSettlement.splice(targetEmail, 1)
            setIsJoin(false)
        }

        const updateOBJ = { whoJoin: cloneWhoJoin, whoJoinEmail: cloneWhoJoinEmail, settlement: cloneSettlement }
        
        hendleDBactions('booking', DataID, updateOBJ, 'UPDATE')

        setiWhoJoin(cloneWhoJoin)
        setiWhoJoinEmail(cloneWhoJoinEmail)
        setiSettlement(cloneSettlement)

        // reset DB data
        setTimeout(function() {
            hendleDBactions('booking', '', '', '', resetBookingData)
            hendleDBactions('memberCard', '', '', '', resetMemberData)
        }, 3000)
    }
    const resetBookingData = d => {
        dispatch(saveBookingData(d))
    }
    const resetMemberData = d => {
        dispatch(saveALLMemberData(d))
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
        hendleDBactions(
            'booking',
            DataID,
            {
                questions: iQuestion,
                Title: iTitle,
                PhotoOrVideo: iPhotoOrVideo,
                Material: iMaterial === undefined ? "" : iMaterial,
                maxParticipants: iNumberOfParticipants,
                time: iTime
            },
            'UPDATE'
        )

        resetBookingData()

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
            ) : (
                <div className="EdtingCardContent">
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
                        key={`CarCover`}
                        label={`Cover's Link`}
                        placeholder="This can be blank"
                        fullWidth
                        multiline
                        defaultValue={iPhotoOrVideo}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e, i) => handleInputChange(e, 'cover')}
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
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => handleEditingSave()}
                        >
                            Save
                        </Button>
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
