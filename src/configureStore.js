import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { verifyAuth, saveBookingData } from './actions/';
import rootReducer from './reducers'; // export combineReducers({ auth });  methods

import { db } from './firebase/firebase';
// initialize our store
// it will be the first thing happens to our redux store
export default function configureStore(persistedState) {
    const store = createStore(rootReducer, persistedState, applyMiddleware(thunkMiddleware));
    store.dispatch(verifyAuth());

    //getData
    db.collection('booking')
        .get()
        .then(snapshot => {
            initData(snapshot);
        });

    const initData = data => {
        let initBookingData = [];
        data.forEach(doc => {
            const booked = doc.data();
            initBookingData.push({ ...booked, DataID: doc.id });
        });
        store.dispatch(saveBookingData(initBookingData));
    };

    return store;
}
