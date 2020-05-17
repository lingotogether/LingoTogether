import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    VERIFY_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SAVE_BOOKING_DATA,
    C_BOX_OPEN,
    BOOKING_DATE_DATA,
    CURRENT_USER,
    SAVE_ALL_MEMBER_DATA,
    SET_DEVICE,
} from '../actions/';

export default (
    state = {
        isLoggingIn: false,
        isLoggingOut: false,
        isVerifying: false, // init verifyAuth已進行
        loginError: false,
        logoutError: false,
        SignupError: false,
        isAuthenticated: false, //已登入
        isSignuping: false,
        isSignuped: false,
        user: {},
        initBookingData: null,
        cBoxShow: false,
        BookingDateData: null,
        CurrentUser: null,
        initALLMemberData: null,
        isAdminAccount: false,
        deviceIsMobile: false,
    },
    action
) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: false,
            };
        case LOGIN_SUCCESS:
            const isAdmin = action.user.email === 'admin@lingo.com' || action.user.email === 'charliee1009@gmail.com';
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true, //已登入.
                user: action.user,
                isAdminAccount: isAdmin,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                isVerifying: false,
                loginError: true,
            };
        case SIGNUP_REQUEST:
            return {
                ...state,
                isSignuping: true,
                SignupError: false,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isSignuping: false,
                isSignuped: true,
                isVerifying: false,
                isAuthenticated: false,
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                SignupError: true,
            };
        case VERIFY_SUCCESS:
            return {
                ...state,
                isVerifying: true,
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isVerifying: false,
                isAuthenticated: false,
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                isVerifying: true,
                isAuthenticated: true,
                logoutError: true,
            };
        case SAVE_BOOKING_DATA:
            return {
                ...state,
                initBookingData: action.initBookingData,
            };
        case C_BOX_OPEN: {
            return {
                ...state,
                cBoxShow: action.Show,
            };
        }
        case BOOKING_DATE_DATA:
            return {
                ...state,
                BookingDateData: action.BookingDateData,
            };
        case CURRENT_USER:
            return {
                ...state,
                CurrentUser: action.user,
            };
        case SAVE_ALL_MEMBER_DATA:
            return {
                ...state,
                initALLMemberData: action.initALLMemberData,
            };
        case SET_DEVICE:
            return {
                ...state,
                deviceIsMobile: action.isMobile,
            };
        default:
            return state;
    }
};
