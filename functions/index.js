const functions = require("firebase-functions");
const firebase = require("firebase/app");
require('firebase/auth');
require('firebase/firestore');

var admin = require("firebase-admin");

const myFirebase = admin.initializeApp();

const db = myFirebase.firestore();

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
                })
            }            

        })
        .catch(error => {
            console.log(error);
        })        
    return null;
  });
