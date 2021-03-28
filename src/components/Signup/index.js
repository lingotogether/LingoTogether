import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import SignupForm from './SignupForm'
import { hendleDBactions } from '../../actions/handleDB'
import { signupUser } from '../../actions'
import '../../style/SignupMember.scss'

const styles = () => ({
    '@global': {
        body: {
            backgroundColor: '#fff',
        },
    },
    paper: {
        marginTop: 100,
        display: 'flex',
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#ffa500',
    },
    form: {
        marginTop: 1,
    },
    errorText: {
        color: '#f50057',
        marginBottom: 5,
        textAlign: 'center',
    },
})

const Signup = ({ classes, dispatch, isAuthenticated }) => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ level, setLevel ] = useState(1)
    const [ skypeID, setSkypeID ] = useState('')
    const [ userName, setUserName ] = useState('')
    const [ infoSource, setInfoSource ] = useState('')

    const handleSubmit = () => {
        if (isAuthenticated) {
            alert("You've logged in, if you want to create a new account, please log out first")
            return
        }
        const emailLowerCase = email.toLowerCase()

        const updateOBJ = {
            Status: 0,
            Email: emailLowerCase,
            UserName: userName,
            JoinDate: new Date(),
            LastUpdateTime: new Date(),
            Bead: 0, 
            SkypeID: skypeID,
            GainedPoint: 0,
            HostPoint: 0,
            Level: level,
            isPassed: false,
            InfoSource: infoSource,
        }

        if (isValid()) {
            hendleDBactions('memberCard', emailLowerCase, updateOBJ, 'SET')
            dispatch(signupUser(email, password, updateOBJ))
        }
    }

    const isValid = () => {
        if (
            email === '' ||
            password === '' ||
            level === '' ||
            //skypeID === '' ||
            userName === ''
        ) {
            alert('Please fill in the form completely!')
            return false
        } else {
            return true
        }
    }

    const handleOnChange = (e, type) => {
        const { value } = e.target
        switch(type) {
            case 'userName':
                setUserName(value)
                break
            case 'skypeID':
                setSkypeID(value)
                break
            case 'level':
                setLevel(value)
                break
            default:
                break
        }
    }

    return (
        <div className="SignUpPage">
            <Container component="main">
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={({ target }) => setEmail(target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <SignupForm
                        handleOnChange={handleOnChange}
                        levelVal={level}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="info_source"
                        label="How did you hear about lingotogether? 您是在哪裡得知lingotogether?"
                        aria-label="How did you hear about lingotogether?"
                        onChange={({ target }) => setInfoSource(target.value)}
                    />

                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                </Paper>
            </Container>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Signup))
