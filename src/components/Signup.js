import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../actions';
import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import SignupForm from './SignupForm';
import '../style/SignupMember.scss';
import { hendleDBactions } from '../actions/handleDB';

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
});

class Signup extends Component {
    state = {
        email: '',
        password: '',
        LineID: '',
        JoinDate: '',
        LastUpdateTime: '',
        Level: 1,
        SkypeID: '',
        userName: '',
    };

    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
    };

    handlePasswordChange = ({ target }) => {
        this.setState({ password: target.value });
    };

    handleSubmit = () => {
        const { dispatch, isAuthenticated } = this.props;
        if (isAuthenticated) {
            alert("You've logged in, if you want to create a new account, please log out first");
            return;
        }
        const { email, password, LineID, Level, SkypeID, userName } = this.state;
        const emailLowerCase = email.toLowerCase();
        let updateOBJ = {
            Email: emailLowerCase,
            LineID: LineID,
            JoinDate: new Date(),
            LastUpdateTime: new Date(),
            Level: Level,
            SkypeID: SkypeID,
            UserName: userName,
            GainedPoint: 0,
            HostPoint: 0,
            isPassed: false,
            Status: 0,
        };
        const isValid = this.CheckValid();

        if (isValid) {
            hendleDBactions('memberCard', emailLowerCase, updateOBJ, 'SET');

            dispatch(signupUser(email, password, updateOBJ));
        }
    };

    CheckValid = () => {
        const { email, password, LineID, Level, SkypeID, userName } = this.state;

        if (
            email === '' ||
            password === '' ||
            LineID === '' ||
            Level === '' ||
            SkypeID === '' ||
            userName === ''
        ) {
            alert('Please fill in the form completely!');
            return false;
        } else {
            return true;
        }
    };

    handleOnChange = (e, type) => {
        this.setState({ [type]: e.target.value });
    };
    render() {
        const { classes } = this.props;
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
                            onChange={this.handleEmailChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={this.handlePasswordChange}
                        />
                        <SignupForm
                            handleOnChange={this.handleOnChange}
                            levelVal={this.state.Level}
                        />

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                        >
                            Sign Up
                        </Button>
                    </Paper>
                </Container>
            </div>
        );
    }
    // }
}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

export default withStyles(styles)(connect(mapStateToProps)(Signup));
