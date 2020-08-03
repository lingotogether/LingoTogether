import { db } from '../firebase/firebase'

export function hendleDBactions(collection, DataID, DataObj, type, CallBackFunction) {
    const sfDocRef = DataID ? db.collection(collection).doc(DataID) : null
    switch (type) {
        case 'SET':
            sfDocRef
                .set(DataObj)
                .then(function() {
                    // console.log('建立成功: ', DataObj)
                    CallBackFunction && CallBackFunction()
                })
                .catch(function(err) {
                    // console.log(err)
                    alert('伺服器發生錯誤，請稍後再試')
                })
            break

        case 'UPDATE':
            if (sfDocRef) {
                sfDocRef
                    .update(DataObj)
                    .then(function() {
                        // console.log('修改成功: ', DataObj)
                        CallBackFunction && CallBackFunction()
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
                    // console.log('刪除成功')
                })
                .catch(function() {
                    alert('伺服器發生錯誤，請稍後再試')
                })
            break

        case 'getMemberCardByEmail':
            db.collection('memberCard')
                .where('Email', '==', DataID)
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.docs.length < 1) {
                        CallBackFunction && CallBackFunction({ noData: true })
                    } else {
                        querySnapshot.forEach(function(doc) {
                            CallBackFunction && CallBackFunction(doc.data())
                        })
                    }
                })
                .catch(function(error) {
                    // console.log('Error getting documents: ', error)
                    CallBackFunction && CallBackFunction({ noData: true })
                })
            break

        case 'getMemberCardByUserID':
            db.collection('memberCard')
                .where('uid', '==', DataID)
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.docs.length < 1) {
                        CallBackFunction && CallBackFunction({ noData: true })
                    } else {
                        querySnapshot.forEach(function(doc) {
                            CallBackFunction && CallBackFunction(doc.data())
                        })
                    }
                })
                .catch(function(error) {
                    // console.log('Error getting documents: ', error)
                    CallBackFunction && CallBackFunction({ noData: true })
                })
            break

        case 'getBookingByDateAndLevel':
            db.collection('booking')
                .where('date', '==', DataObj.date)
                .where('classLv', '==', DataObj.level)
                .get()
                .then((querySnapshot) => {
                    if (querySnapshot.docs.length < 1) {
                        CallBackFunction && CallBackFunction({ noData: true })
                    } else {
                        querySnapshot.forEach(doc => {
                            CallBackFunction && CallBackFunction({...doc.data(), DataID: doc.id})
                        })
                    }
                })
                .catch(function(error) {
                    // console.log('Error getting documents: ', error)
                    CallBackFunction && CallBackFunction({ noData: true })
                })
            break

        case 'getLastBookingBeforeDate':
            db.collection('booking')
                .orderBy('date', 'desc')
                .startAfter(DataObj)
                .limit(1)
                .get()
                .then((querySnapshot) => {
                    if (querySnapshot.docs.length < 1) {
                        CallBackFunction({ noData: true })
                    } else {
                        querySnapshot.forEach(doc => {
                            CallBackFunction({...doc.data(), DataID: doc.id})
                        })
                    }
                })
                .catch(function(error) {
                    // console.log('Error getting documents: ', error)
                    CallBackFunction({ noData: true })
                })
            break

        default:
            db.collection(collection)
                .get()
                .then(querySnapshot => {
                    
                    let initData = []
                    querySnapshot.forEach(doc => {
                        const data = doc.data()
                        initData.push({ ...data, DataID: doc.id })
                    })

                    CallBackFunction && CallBackFunction(initData)
                })
            break
    }
}
