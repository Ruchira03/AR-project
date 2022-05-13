var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var db = require('./models/index')
var authRouter = require('./routes/auth');
var categoryRouter = require('./routes/category')
const errorHandler = require('./middleware/errorHandler');
const productRouter = require('./routes/product')
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
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', authRouter);
app.use('/api', categoryRouter);
app.use('/api', productRouter);

//catch error
app.use(errorHandler)


module.exports = app;
