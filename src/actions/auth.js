import { useRadioGroup } from '@material-ui/core';
import dayjs from 'dayjs';
import { myFirebase } from '../firebase/firebase';
// import { db } from '../firebase/firebase';
import { hendleDBactions } from './handleDB';
import * as firebase from 'firebase/app'

// broken each action up into three parts to track the asynchronous state within our application.
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const CURRENT_USER = 'CURRENT_USER';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const VERIFY_REQUEST = 'VERIFY_REQUEST';
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const SAVE_BOOKING_DATA = 'SAVE_BOOKING_DATA';

export const C_BOX_OPEN = 'C_BOX_OPEN';

export const BOOKING_DATE_DATA = 'BOOKING_DATE_DATA';
export const SAVE_ALL_MEMBER_DATA = 'SAVE_ALL_MEMBER_DATA';

export const SET_DEVICE = 'SET_DEVICE';

// New feature
export const SAVE_BEADS_RECORD_DATA = 'SAVE_BEADS_RECORD_DATA';
export const SAVE_PRIZE_DATA = 'SAVE_PRIZE_DATA';


// Login methods
const requestLogin = () => {
    return {
        type: LOGIN_REQUEST,
    };
};

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        user,
    };
};

const loginError = () => {
    return {
        type: LOGIN_FAILURE,
    };
};

const setCurrentUser = user => {
    // console.log('setCurrentUser', user);
    return {
        type: CURRENT_USER,
        user,
    };
};

// LogOut methods
const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST,
    };
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS,
    };
};

const logoutError = () => {
    return {
        type: LOGOUT_FAILURE,
    };
};
// verifyRequest methods
const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST,
    };
};

// const verifySuccess = () => {
//     return {
//         type: VERIFY_SUCCESS,
//     };
// };

// SignUp methods
const requestSignup = () => {
    return {
        type: SIGNUP_REQUEST,
    };
};

const receiveSignup = user => {
    return {
        type: SIGNUP_SUCCESS,
        user,
    };
};

// const SignupError = () => {
//     return {
//         type: SIGNUP_FAILURE,
//     };
// };

export const cBoxController = Show => {
    return {
        type: C_BOX_OPEN,
        Show,
    };
};

export const BookingDateData = BookingDateData => {
    return {
        type: BOOKING_DATE_DATA,
        BookingDateData,
    };
};

export const saveBookingData = initBookingData => {
    // console.log('saveBookingData', initBookingData);
    return {
        type: SAVE_BOOKING_DATA,
        initBookingData,
    };
};

export const saveALLMemberData = initALLMemberData => {
    // console.log('saveALLMemberData', initALLMemberData);
    return {
        type: SAVE_ALL_MEMBER_DATA,
        initALLMemberData,
    };
};

export const saveBeadsRecordData = initBeadsRecordData => {
    // console.log('saveBeadsRecordData', initBeadsRecordData);
    return {
        type: SAVE_BEADS_RECORD_DATA,
        initBeadsRecordData,
    };
};

export const savePrizeData = initPrizeData => {
    // console.log('savePrizeData', initPrizeData);
    return {
        type: SAVE_PRIZE_DATA,
        initPrizeData,
    };
};

export const deviceIsMobile = isMobile => {
    return {
        type: SET_DEVICE,
        isMobile,
    };
};

// init 會進來
export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());
    myFirebase.auth().onAuthStateChanged(user => {
        // console.log('dispatch(verifyRequest());  user: ', user);
        if (user !== null) {
            const receiveMemberData = data => {
                if (!data.uid) {
                    data.uid = user.uid;
                    hendleDBactions('memberCard', data.Email, data, 'UPDATE', );
                }
                dispatch(setCurrentUser({ ...user, memberData: data }));
            };
            chectCompleteInfo(user, receiveMemberData);
            initBeadsRecordData(dispatch);
            initPrizeData(dispatch);
            dispatch(receiveLogin(user));
        } else {
            // alert('Please Sign up or Login');
        }

        // dispatch(verifySuccess());
        initALLMemberData(dispatch);

        // hendleDBactions('memberCard', '', {}, 'receiveALLMemberData', receiveALLMemberData);
    });
};

const initALLMemberData = dispatch => {
    const receiveALLMemberData = ALLdata => {
        dispatch(saveALLMemberData(ALLdata));
    };
    hendleDBactions('memberCard', '', {}, 'receiveALLMemberData', receiveALLMemberData);
};

const chectCompleteInfo = (user, receiveMemberData) => {
    hendleDBactions('memberCard', user.email, {}, 'getMemberCardByEmail', receiveMemberData);
};

const initBeadsRecordData = dispatch => {
    const receiveBeadsRecordData = ALLdata => {
        dispatch(saveBeadsRecordData(ALLdata));
    };
    hendleDBactions('beadsRecord', '', {}, '', receiveBeadsRecordData);
};

const initPrizeData = dispatch => {
    const receivePrizeData = ALLdata => {
        dispatch(savePrizeData(ALLdata));
    };
    hendleDBactions('prize', '', {}, '', receivePrizeData);
};

export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin());
    myFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            if (!myFirebase.auth().currentUser.emailVerified && user.user.email !== 'admin@lingo.com'){
                sendEmailVerification();
                alert('We have sent an email with a confirmation link to your email address.please click the confirmation link.\nIf you do not receive a confirmation email, Please check your spam folder.');
                dispatch(logoutUser());
                return;
            }            
            
            const receiveMemberData = data => {

                if (data.noData){
                    dispatch(receiveLogin(user));
                    return;
                }
                
                if (data.isNew == undefined || data.isNew == true){
                    
                    if (!isNaN(data.Bead)){
                        alert("Welcome! You got 10 beads.")
                        data.isNew = false;
                        data.Bead = data.Bead + 10;
                        hendleDBactions('memberCard', data.Email, data, 'UPDATE', );

                        hendleDBactions('beadsRecord',
                            'emailVerification-' + data.uid, {
                                Date: firebase.firestore.Timestamp.fromMillis(dayjs().valueOf()),
                                Level: 0,
                                Bead: 10,
                                Title: "Email Verification",
                                Status: "Get 10 Beads",
                                FromUserID: "system",
                                ToUserID: data.uid,
                            }, 'SET',
                        )
                        initBeadsRecordData(dispatch);
                        initALLMemberData(dispatch);
                        
                        dispatch(setCurrentUser({
                            ...user.user,
                            memberData: {
                                ...data
                            }}))
                    }
                    
                    dispatch(receiveLogin(user));
                }
                
            };

            hendleDBactions('memberCard', user.user.email, '', 'getMemberCardByEmail', receiveMemberData);
                                    
            dispatch(receiveLogin(user));
        })
        .catch(error => {
            // Do something with the error if you want!
            dispatch(loginError());
        });
};

export const logoutUser = () => dispatch => {
    alert('Logging out');
    dispatch(requestLogout());
    myFirebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(receiveLogout());
            setTimeout((window.location.href = '/'), 2000);
        })
        .catch(error => {
            // Do something with the error if you want!
            dispatch(logoutError(error));
        });
};

export const signupUser = (email, password, userData) => dispatch => {
    dispatch(requestSignup());
    myFirebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
            sendEmailVerification();
            alert('We have sent an email with a confirmation link to your email address.please click the confirmation link.\nIf you do not receive a confirmation email, Please check your spam folder.');
            dispatch(receiveSignup(user));
            const setTimeoutWhenDown = () => {
                dispatch(logoutUser());
                setTimeout((window.location.href = '/'), 2000);
            };
            hendleDBactions('memberCard', email, userData, 'SET', setTimeoutWhenDown);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            // console.log(error);
        });
};

export const resetPassword = email => {
    myFirebase
        .auth()
        .sendPasswordResetEmail(email, {
            url: 'https://lingotogether.com',
            handleCodeInApp: true
        }).then(() => {
            alert('Password reset link has been sent. Please check your email address to reset password')
        })
        .catch(err => alert(err.message))
}

export const sendEmailVerification = () => {
    myFirebase
        .auth().languageCode = 'en';

    myFirebase
        .auth()
        .currentUser
        .sendEmailVerification()
        .then(() => {
            
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
};

// export const signupWithGoogle = () => {
//     myFirebase.auth().signInWithPopup(provider).then(function (result) {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         var token = result.credential.accessToken;
//         // The signed-in user info.
//         var user = result.user;
//         // ...
//     }).catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // The email of the user's account used.
//         var email = error.email;
//         // The firebase.auth.AuthCredential type that was used.
//         var credential = error.credential;
//         // ...
//     });
// }

// export const resetAllBookingData = () => dispatch => {
//     db.collection('booking')
//         .get()
//         .then(snapshot => {
//             let initBookingData = [];
//             snapshot.forEach(doc => {
//                 const booked = doc.data(); //obj
//                 initBookingData.push({ ...booked, DataID: doc.id });
//             });
//             console.log('resetAllBookingData', initBookingData);
//             dispatch(saveBookingData(initBookingData));
//         });
// dispatch(saveBookingData(data));
// };

// export const handlecBoxController = show => dispatch => {
//     console.log('handlecBoxController');
//     dispatch(cBoxController(show));
// };

// export const setBookingDateData = detail => dispatch => {
//     dispatch(BookingDateData(detail));
// };
