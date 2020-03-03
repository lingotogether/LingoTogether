import { myFirebase } from '../firebase/firebase';
// import { db } from '../firebase/firebase';
import { hendleDBactions } from './handleDB';

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
    console.log('setCurrentUser', user);
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
    // console.log('memberData有沒有進', initALLMemberData);
    console.log('initALLMemberData', initALLMemberData);
    return {
        type: SAVE_ALL_MEMBER_DATA,
        initALLMemberData,
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
        console.log(' dispatch(verifyRequest());  user', user);
        if (user !== null) {
            const receiveMemberData = data => {
                if (!data.uid) {
                    data.uid = user.uid;
                    hendleDBactions('memberCard', data.Email, data, 'UPDATE', receiveMemberData);
                    dispatch(setCurrentUser({ ...user, memberData: data }));
                }
                dispatch(setCurrentUser({ ...user, memberData: data }));
            };
            chectCompleteInfo(user, receiveMemberData);
            dispatch(receiveLogin(user));
        } else {
            // alert('Please Sign up or Login');
        }
        //  dispatch(verifySuccess());
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

export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin());
    myFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(receiveLogin(user));
        })
        .catch(error => {
            //Do something with the error if you want!
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
            setTimeout((window.location.href = '/TopHome'), 2000);
        })
        .catch(error => {
            //Do something with the error if you want!
            dispatch(logoutError(error));
        });
};

export const signupUser = (email, password, userData) => dispatch => {
    dispatch(requestSignup());
    myFirebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(receiveSignup(user));
            const setTimeoutWhenDown = () => {
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
            console.log(error);
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
