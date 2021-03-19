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
        
        // handlTimeOffset
        // DB資料皆為台灣時間 再根據所在地區調整時間
        for (let i = 0; i < initBookingData.length; i++) {
            let t = initBookingData[i].time;
            let d = initBookingData[i].date;

            let offset = -(new Date().getTimezoneOffset() / 60) - 8; // 跟台灣的時差(hr)
            let tempTime = parseInt(t.substring(0, 2)) + offset;                        

            if(tempTime < 0){
                tempTime += 24;
                let oldD = new Date(d);
                let newD = new Date(oldD.setDate(oldD.getDate() - 1));                                  

                initBookingData[i].date = newD.getFullYear().toString() + '/' + (newD.getMonth()+1).toString().padStart(2,'0') + '/' + newD.getDate().toString().padStart(2,'0');                          
            }
            else if (tempTime > 23) {
                tempTime -= 24;
                let oldD = new Date(d);
                let newD = new Date(oldD.setDate(oldD.getDate() + 1));  
               
                initBookingData[i].date = newD.getFullYear().toString() + '/' + (newD.getMonth()+1).toString().padStart(2,'0') + '/' + newD.getDate().toString().padStart(2,'0');             
            }

            initBookingData[i].time = tempTime.toString().padStart(2, "0") + "00";
        }        

        store.dispatch(saveBookingData(initBookingData));
    };

    return store;
}
