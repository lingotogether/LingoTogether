const functions = require("firebase-functions");
const firebase = require("firebase/app");
require('firebase/auth');
require('firebase/firestore');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// const firebaseConfig = {
// 	apiKey: "AIzaSyDFhIyRM_Ni_t2ZSbCZabvYGfHkBtmOnic",
// 	authDomain: "lingotogether-735b6.firebaseapp.com",
// 	databaseURL: "https://lingotogether-735b6.firebaseio.com",
// 	projectId: "lingotogether-735b6",
// 	storageBucket: "lingotogether-735b6.appspot.com",
// 	messagingSenderId: "541475531726",
// 	appId: "1:541475531726:web:1a7ced3b14eaec00d3999f",
// 	measurementId: "G-PVXX2H064P"
// };
// const myFirebase = firebase.initializeApp(firebaseConfig);
// const db = myFirebase.firestore();

var admin = require("firebase-admin");

//var serviceAccount = require("path/to/serviceAccountKey.json");

const myFirebase = admin.initializeApp();

//const myFirebase = firebase.initializeApp(firebaseConfig);
const db = myFirebase.firestore();
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     db.collection('schedule')        
//         .get()
//         .then(function(querySnapshot) {
//             if (querySnapshot.docs.length < 1) {
//                 response.send('no Data');
//             } else {
//                 querySnapshot.forEach(function(doc) {
//                     var time = doc.data()["executeTime"];

//                     response.send(new Date(time.seconds * 1000));
//                 })
//             }
//         })
//         .catch(error => {
//             response.send(error);
//         })

        
// //   functions.logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// });

// 每個整點執行
exports.scheduledFunction = functions.pubsub.schedule('0 * * * *').onRun((context) => {    

    // 現在時間(整點)
    var nowDateObj = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours());
    var now = firebase.firestore.Timestamp.fromMillis(nowDateObj.valueOf())
    
    db.collection('schedule')  
        .where('isExecute', '==', false)      
        .get()
        .then(function(querySnapshot) {
            
            if (querySnapshot.docs.length < 1) {
                console.log('no Data');
            } else {
                querySnapshot.forEach(function(doc) {
                    var DataID = doc.data()["DataID"];
                    var type = doc.data()["type"];
                    var DataObj = doc.data()["DataObj"];
                    var key = doc.data()["key"];
                    var time = doc.data()["executeTime"];//排程執行時間(會議時間+1小時)

                    console.log("now");
                    console.log(now);
                    console.log("time");
                    console.log(time);
                    // 需判斷排程執行時間 > 現在時間，預防在整點前已先進入會議室
                    if (now.seconds >= time.seconds){
                        switch (type) {
                            case 'SET':                            
                                db.collection(doc.data()["collection"]).doc(DataID)
                                    .set(DataObj)
                                    .then(function() {
                                        console.log('建立成功');
                                        
                                        // Update schedule
                                        db.collection('schedule').doc(key)                                        
                                            .update({
                                                isExecute: true
                                            })
                                            .then(function() {
                                                console.log('排程修改成功');                                            
                                            })
                                            .catch(function(err) {
                                                console.log('排程修改錯誤');
                                                console.log(err);                                       
                                            })
                                    })
                                    .catch(function(err) {
                                        console.log('建立失敗');
                                        console.log(err);                                                                        
                                    })
                                break;                                                        
    
                            case 'UPDATE':
                                if (DataID) {
                                    var Bead = doc.data()["Bead"];
                                    var DataObjAfterCal = {
                                        ...DataObj,
                                        Bead: DataObj.Bead + Bead
                                    }
    
                                    db.collection(doc.data()["collection"]).doc(DataID)
                                        .update(DataObjAfterCal)
                                        .then(function() {
                                            console.log('修改成功');
                                            
                                            // Update schedule
                                            db.collection('schedule').doc(key)                                            
                                                .update({
                                                    isExecute: true
                                                })
                                                .then(function() {
                                                    console.log('排程修改成功');                                                
                                                })
                                                .catch(function(err) {
                                                    console.log('排程修改失敗');;
                                                    console.log(err);                                                
                                                })
                                        })
                                        .catch(function(err) {
                                            console.log('修改失敗');
                                            console.log(err)                                        
                                        })
                                }
                                else{
                                    console.log('DataID is null or empty')
                                }
                                break;
                        }
                    }
                    else
                        console.log('排程將於會議後1小時執行')

                    

                    // time = doc.data()["executeTime"];

                    // console.log(new Date(time.seconds * 1000));
                    // console.log(new Date());
                    // if (new Date(time.seconds * 1000).getHours() == new Date().getHours()){
                    //     console.log('same hour');
                    // }
                    // else
                    //     console.log('not same hour');
                })
            }            

        })
        .catch(error => {
            console.log(error);
        })
    //console.log('每 2 分鐘觸發一次');    
    return null;
  });
