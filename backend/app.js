var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./models/index')
var authRouter = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config()
var app = express();

db.mongoose.connect(process.env.DB_CONNECTION_STRING,{
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
        .then(() => {
            console.log("Connected to Mongo DB");
        })
        .catch(err => {
            console.error("Connection error", err);
            process.exit();
        })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', authRouter)

//catch error
app.use(errorHandler)


module.exports = app;
