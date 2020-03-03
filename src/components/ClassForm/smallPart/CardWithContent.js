import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { hendleDBactions } from '../../../actions/handleDB';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { cBoxController, saveBookingData, saveALLMemberData } from '../../../actions';
import DeleteIcon from '@material-ui/icons/Delete';

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
}));

export default function CardWithContent(props) {
    const {
        classLv,
        Title,
        date,
        time,
        PhotoOrVideo,
        Material,
        CreateUserName,
        CreateUserID,
        whoJoin,
        questions,
        DataID,
        CurrentUser,
        dispatch,
        isAdminAccount,
        whoJoinEmail,
    } = props;

    const classes = useStyles();
    const [iwhoJoin, setiWhoJoin] = React.useState(whoJoin || []);
    const [iwhoJoinEmail, setiiwhoJoinEmail] = React.useState(whoJoinEmail || []);
    const [isJoin, setIsJoin] = React.useState(false);
    const [isHost, setIsHost] = React.useState(false);
    const [CanBeUpdated, SetCanBeUpdated] = React.useState(false);
    const [Editing, setEditing] = React.useState(false);
    const [iQuestion, setiQuestion] = React.useState(questions);
    const [iLevel, setiLevel] = React.useState(classLv);

    const [iTitle, setiTitle] = React.useState(Title);
    const [iPhotoOrVideo, setiPhotoOrVideo] = React.useState(
        PhotoOrVideo || 'https://miro.medium.com/max/3600/1*ORHmMQBfcVlNMvW_FOt-uA.png'
    );
    const [iMaterial, setiMaterial] = React.useState(Material);

    const level = ['初級', '中級', '進階'];

    React.useEffect(() => {
        if (CurrentUser && isAdminAccount) {
            setIsHost(true);
            SetCanBeUpdated(true);
        } else {
            if (!CurrentUser) {
                setIsJoin(false);
                setIsHost(false);
                SetCanBeUpdated(false);
            } else {
                if (whoJoin) {
                    let targetI;

                    if (whoJoinEmail) {
                        targetI = whoJoinEmail.indexOf(CurrentUser.email);
                    } else {
                        targetI = whoJoin.indexOf(CurrentUser.memberData.UserName);
                    }
                    console.log('targetI', targetI);
                    targetI === -1 ? setIsJoin(false) : setIsJoin(true);
                } else {
                    setIsJoin(false);
                }

                if (CreateUserID === CurrentUser.uid) {
                    SetCanBeUpdated(true);
                    setIsHost(true);
                }
            }
        }
    }, []);

    const handleJoinClick = event => {
        if (!CurrentUser) return;
        const { memberData, email } = CurrentUser;
        const { UserName } = memberData;
        let cloneWhoJoin = JSON.parse(JSON.stringify(iwhoJoin));
        let cloneWhoJoinEmail = JSON.parse(JSON.stringify(iwhoJoinEmail));
        // const targetI = cloneWhoJoin.indexOf(CurrentUser.uid);
        const targetI = cloneWhoJoin.indexOf(UserName);
        const targetEmail = cloneWhoJoinEmail.indexOf(email);
        console.log(222333, cloneWhoJoinEmail);
        console.log(1233427468, targetI, targetEmail);
        if (!isJoin) {
            cloneWhoJoin.push(UserName);
            cloneWhoJoinEmail.push(email);
            setIsJoin(true);
            hendleDBactions(
                'memberCard',
                CurrentUser.email,
                {
                    ...CurrentUser.memberData,
                    GainedPoint: CurrentUser.memberData.GainedPoint + 1,
                },
                'UPDATE'
            );
            // alert('Congratulations! +1 Bread! ');
        } else {
            cloneWhoJoin.splice(targetI, 1);
            cloneWhoJoinEmail.splice(email, 1);
            setIsJoin(false);
            hendleDBactions(
                'memberCard',
                CurrentUser.email,
                {
                    ...CurrentUser.memberData,
                    GainedPoint: CurrentUser.memberData.GainedPoint - 1,
                },
                'UPDATE'
            );
            // alert('Ooops! -1 Bread! ');
        }
        const updateOBJ = { whoJoin: cloneWhoJoin, whoJoinEmail: cloneWhoJoinEmail };
        hendleDBactions('booking', DataID, updateOBJ, 'UPDATE');
        setiWhoJoin(cloneWhoJoin);
        // reset DB data
        setTimeout(function() {
            hendleDBactions('booking', '', '', '', resetBookingData);
            hendleDBactions('memberCard', '', '', '', resetMemberData);
        }, 9000);
    };
    const resetBookingData = d => {
        console.log(748998713);
        dispatch(saveBookingData(d));
    };
    const resetMemberData = d => {
        console.log(748998713);
        dispatch(saveALLMemberData(d));
    };
    const handleInputChange = (e, type) => {
        const { value } = e.currentTarget;
        switch (type) {
            case 'title':
                setiTitle(value);
                break;
            case 'url':
                setiMaterial(value);
                break;
            case 'cover':
                setiPhotoOrVideo(value);
                break;
            case 'QArr':
                const index = e.target.getAttribute('name');
                let cloneiQuestion = iQuestion.concat([]);
                cloneiQuestion.splice(index, 1, e.target.value);
                setiQuestion(cloneiQuestion);
                break;
            default:
                return;
        }
    };
    const handleDeleteData = () => {
        if (window.confirm('Are you sure you want to permanently delete this data?')) {
            hendleDBactions('booking', DataID, {}, 'DELETE');
            setEditing(false);

            dispatch(cBoxController(false));
            hendleDBactions(
                'memberCard',
                CurrentUser.email,
                {
                    ...CurrentUser.memberData,
                    HostPoint: CurrentUser.memberData.HostPoint - 2.5,
                },
                'UPDATE'
            );

            setTimeout(function() {
                hendleDBactions('booking', '', '', '', resetBookingData);
                hendleDBactions('memberCard', '', '', '', resetMemberData);
            }, 3000);
        } else {
            alert('Error, please contact to our cuscomer service via Line');
            setEditing(true);
        }
    };

    const handleEditingSave = () => {
        setEditing(false);
        hendleDBactions(
            'booking',
            DataID,
            {
                questions: iQuestion,
                Title: iTitle,
                PhotoOrVideo: iPhotoOrVideo,
                Material: iMaterial,
            },
            'UPDATE'
        );

        resetBookingData();

        setiLevel(classLv);
    };

    const handleClickEditing = open => {
        if (open) {
            setEditing(true);
            setiLevel('Edit');
        } else {
            setEditing(false);
            setiLevel(classLv);
        }
    };

    const iconclassName =
        props.classLv === 0
            ? 'AvatarIcon green'
            : props.classLv === 2
            ? 'AvatarIcon yellow'
            : 'AvatarIcon';

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
                        iTitle
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
                subheader={date + '  ' + time}
            />
            {isHost ? null : (
                <>
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
                </>
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
                            <span className="CardLabel">Participant: </span> {iwhoJoin.join(', ')}
                        </div>
                    </CardContent>
                </div>
            ) : (
                <div className="EdtingCardContent">
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
                                            handleInputChange(e, 'QArr');
                                        }}
                                    />
                                );
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
                            Cancle
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
                            return <li paragraph key={`readMore${i}`}>{`${i + 1}. ${item}`}</li>;
                        })}
                    </ul>
                </CardContent>
            )}
        </Card>
    );
}
