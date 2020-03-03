import { db } from '../firebase/firebase';
import { resetAllBookingData } from './auth';
//  hendleDBactions('booking', DataID, updateOBJ, 'UPDATE');
//import { hendleDBactions } from '../../../actions/handleDB';
export function hendleDBactions(collection, DataID, DataObj, type, CallBackFunction) {
    const sfDocRef = DataID ? db.collection(collection).doc(DataID) : null;
    switch (type) {
        case 'SET':
            console.log('DataID', DataID);
            sfDocRef
                .set(DataObj)
                .then(function() {
                    console.log('建立成功');
                    CallBackFunction && CallBackFunction();
                })
                .catch(function() {
                    alert('伺服器發生錯誤，請稍後再試');
                });

            break;
        case 'UPDATE':
            console.log('DataObj', DataObj);
            if (sfDocRef) {
                sfDocRef
                    .update(DataObj)
                    .then(function() {
                        console.log('修改成功');
                    })
                    .catch(function() {
                        alert('伺服器發生錯誤，請稍後再試');
                    });
            }
            break;
        case 'DELETE':
            sfDocRef
                .delete()
                .then(function() {
                    console.log('刪除成功');
                })
                .catch(function() {
                    alert('伺服器發生錯誤，請稍後再試');
                });
            break;
        case 'getMemberCardByEmail':
            db.collection('memberCard')
                .where('Email', '==', DataID)
                .get()
                .then(function(querySnapshot) {
                    // console.log('*************', querySnapshot.docs.length);
                    if (querySnapshot.docs.length < 1) {
                        CallBackFunction({ noData: true });
                    } else {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            // console.log('*************');
                            // console.log(doc.id, ' => ', doc.data());
                            CallBackFunction(doc.data());
                        });
                    }
                })
                .catch(function(error) {
                    console.log('Error getting documents: ', error);
                    CallBackFunction({ noData: true });
                });
            // let docRef = db.collection(collection).doc(DataID);
            // console.log('docRef', docRef);
            // let getOptions = {
            //     source: 'cache',
            // };
            // docRef
            //     .get(getOptions)
            //     .then(function(doc) {
            //         // Document was found in the cache. If no cached document exists,
            //         // an error will be returned to the 'catch' block below.
            //         console.log('Cached document data:', doc.data());
            //     })
            //     .catch(function(error) {
            //         console.log('Error getting cached document:', error);
            //     });

            // db.collection(collection)
            //     .get()
            //     .then(snapshot => {
            //         let gotData = [];
            //         snapshot.forEach(doc => {
            //             const booked = doc.data(); //obj
            //             gotData.push({ ...booked, DataID: doc.id });
            //         });
            //         console.log(gotData, 'gotData  -******');
            //         CallBackFunction(gotData);
            //     })
            //     .catch(function() {
            //         CallBackFunction(false);
            //     });
            // break;
            // case 'resetAllBookingData':
            //     console.log('resetAllBookingData');
            //     db.collection(collection)
            //         .get()
            //         .then(snapshot => {
            //             initData(snapshot);
            //         });

            break;
        default:
            db.collection(collection)
                .get()
                .then(snapshot => {
                    let initData = [];
                    snapshot.forEach(doc => {
                        const booked = doc.data(); //obj
                        initData.push({ ...booked, DataID: doc.id });
                    });

                    CallBackFunction && CallBackFunction(initData);
                });
            // const initData = data => {
            //     //data is documents's array
            //     let initBookingData = [];
            //     data.forEach(doc => {
            //         const booked = doc.data(); //obj
            //         initBookingData.push({ ...booked, DataID: doc.id });
            //     });
            //     CallBackFunction(initBookingData);
            // };
            break;
    }
}
// export const setDB = (collection, DataID, DataObj) => {
//     const sfDocRef = db.collection('booking').doc(DataID);
//     sfDocRef.set(DataObj);
//     // console.log('whoJoin', whoJoin);
//     // console.log('cloneWhoJoin', cloneWhoJoin);
//     // batch.update(sfDocRef, { whoJoin: cloneWhoJoin });
//     db.collection('booking')
//         .doc(DataID)
//         .get()
//         .then(d => console.log(d.data()));
// };

// const updateDB = (collection, DataID, DataObj) => {
//     const sfDocRef = db.collection('booking').doc(DataID);
//     sfDocRef.update(DataObj);
// };

// const deleteDB = (collection, DataID, DataObj) => {
//     const sfDocRef = db.collection('booking').doc(DataID);
//     sfDocRef.delete(DataObj);
// };

// const getDB = (collection, DataID, CallBackFunction) => {
//     db.collection(collection)
//         .doc(DataID)
//         .get()
//         .then(d => CallBackFunction(d));
// };
