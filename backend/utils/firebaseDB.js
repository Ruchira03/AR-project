const { initializeApp } = require('firebase/app');
const dotenv = require("dotenv");
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId:process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };

// Creates and initializes a Firebase app instance. Pass options as param
const db = initializeApp(firebaseConfig);

module.exports = db;