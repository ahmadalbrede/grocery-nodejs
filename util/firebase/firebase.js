const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyBlkPp4t4p8lWO_gmQWtMhapVTFW76csNg",
    authDomain: "userapi-c05d0.firebaseapp.com",
    projectId: "userapi-c05d0",
    storageBucket: "userapi-c05d0.appspot.com",
    messagingSenderId: "993506052304",
    appId: "1:993506052304:web:199f30a063df2c70ebb6d5",
    measurementId: "G-D8P8HFHCJ5"
};

firebase.initializeApp(firebaseConfig); //initialize firebase app 
module.exports = { firebase }; //export the app