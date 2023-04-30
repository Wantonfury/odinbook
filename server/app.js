require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const FileStore = require('session-file-store')(session);

const User = require('./models/user');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const mongoDB = process.env.MONGODB_URI;

async function main() {
  console.log(mongoDB);
  await mongoose.connect(mongoDB);
  
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
  store: new FileStore(),
}));

app.use(passport.session());
app.use(passport.initialize());

passport.use("login", new LocalStrategy((username, password, done) => {
  const invalid = 'Incorrect username or password.';
  
  User.findOne({ username })
    .then(user => {
      if (!user) return done(null, false, { message: invalid });
      if (!user.isValidPassword(password)) return done(null, false, { message: invalid });
      
      done(null, user);
    })
    .catch(err => done(err, false));
}));

passport.serializeUser((user, done) => {
  done(null, { username: user.username });
});

passport.deserializeUser((user, done) => {
  done(null, user);
})

app.use('/', indexRouter);
app.use('/auth', authRouter);
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
  if (err) console.log(err);

  // render the error page
  res.status(err.status || 500).json({
    error: err
  });
});

module.exports = app;
