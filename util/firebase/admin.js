var admin = require("firebase-admin");

var serviceAccount = require("../../userapi-c05d0-firebase-adminsdk-612vz-62d6ffa78d.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const firebaseConfig = {
    apiKey: "AIzaSyBlkPp4t4p8lWO_gmQWtMhapVTFW76csNg",
    authDomain: "userapi-c05d0.firebaseapp.com",
    projectId: "userapi-c05d0",
    storageBucket: "userapi-c05d0.appspot.com",
    messagingSenderId: "993506052304",
    appId: "1:993506052304:web:199f30a063df2c70ebb6d5",
    measurementId: "G-D8P8HFHCJ5"
};
// admin.initializeApp(firebaseConfig);
const db = admin.firestore();
module.exports = { admin, db };