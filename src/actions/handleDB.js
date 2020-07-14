import { db } from '../firebase/firebase'
import { resetAllBookingData } from './auth'

export function hendleDBactions(collection, DataID, DataObj, type, CallBackFunction) {
    const sfDocRef = DataID ? db.collection(collection).doc(DataID) : null
    switch (type) {
        case 'SET':
            console.log('DataID', DataID)
            sfDocRef
                .set(DataObj)
                .then(function() {
                    console.log('建立成功')
                    CallBackFunction && CallBackFunction()
                })
                .catch(function(err) {
                    console.log(err)
                    alert('伺服器發生錯誤，請稍後再試')
                })

            break
        case 'UPDATE':
            console.log('DataObj', DataObj)
            if (sfDocRef) {
                sfDocRef
                    .update(DataObj)
                    .then(function() {
                        console.log('修改成功')
                    })
                    .catch(function() {
                        alert('伺服器發生錯誤，請稍後再試')
                    })
            }
            break
        case 'DELETE':
            sfDocRef
                .delete()
                .then(function() {
                    console.log('刪除成功')
                })
                .catch(function() {
                    alert('伺服器發生錯誤，請稍後再試')
                })
            break
        case 'getBookingByUid':
            db.collection('booking')
                .get()
                .then((querySnapshot) => {
                    if(querySnapshot.docs.length < 1) {
                        CallBackFunction({ noData: true })
                    } else {
                        querySnapshot.forEach(doc => {
                            CallBackFunction(doc.data())
                        })
                    }
                })
            break
        case 'getMemberCardByEmail':
            db.collection('memberCard')
                .where('Email', '==', DataID)
                .get()
                .then(function(querySnapshot) {
                    // console.log('*************', querySnapshot.docs.length)
                    if (querySnapshot.docs.length < 1) {
                        CallBackFunction({ noData: true })
                    } else {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            // console.log('*************')
                            // console.log(doc.id, ' => ', doc.data())
                            CallBackFunction(doc.data())
                        })
                    }
                })
                .catch(function(error) {
                    console.log('Error getting documents: ', error)
                    CallBackFunction({ noData: true })
                })
            break
        // case 'receiveBeadsRecordData':
        //     db.collection('beadsRecord')
        //         // .where('ToEmail', '==', DataID)
        //         .get()
        //         .then(function(querySnapshot) {
        //             if (querySnapshot.docs.length < 1) {
        //                 CallBackFunction({ noData: true })
        //             } else {
        //                 querySnapshot.forEach(function(doc) {
        //                     CallBackFunction(doc.data())
        //                 })
        //             }
        //         })
        //         .catch(function(error) {
        //             console.log('Error getting documents: ', error)
        //             CallBackFunction({ noData: true })
        //         })
        //     break
        default:
            db.collection(collection)
                .get()
                .then(snapshot => {
                    let initData = []
                    snapshot.forEach(doc => {
                        const booked = doc.data() //obj
                        initData.push({ ...booked, DataID: doc.id })
                    })

                    CallBackFunction && CallBackFunction(initData)
                })
            break
    }
}
