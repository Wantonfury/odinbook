require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const mongoDB = process.env.MONGODB_URI;

async function main() {
  connection = await mongoose.connect(mongoDB);
  
}
main().catch(err => console.log(err));


const app = express();

app.use(cors({ origin: process.env.ORIGIN || 'http://localhost:3000', credentials: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true },
  store: MongoStore.create({ mongoUrl: mongoDB })
}));

app.use(passport.session());
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    error: err
  });
});

module.exports = app;
