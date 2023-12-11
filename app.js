var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('express-handlebars');

//--------------------------------------------------------------------Inicializace modulů pro routy--------------------------------------------------------------------//

var playRouter = require('./routes/play.js');
var homeRouter = require('./routes/home.js');
var rootRouter = require('./routes/root.js');
var chooseRouter = require('./routes/choose.js');
var contactsRouter = require('./routes/contacts.js');
var roomRouter = require('./routes/room.js')
var joinRouter = require('./routes/join.js')
var createRouter = require('./routes/create.js')

//--------------------------------------------------------------------Inicializace modulů pro routy--------------------------------------------------------------------//

var app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//--------------------------------------------------------------------------Inicializace rout--------------------------------------------------------------------------//

app.use('/play/', playRouter);
app.use('/home/', homeRouter);
app.use('/', rootRouter);
app.use('/choose/', chooseRouter);
app.use('/contacts/', contactsRouter);
app.use('/room/', roomRouter);
app.use('/join/', joinRouter);
app.use('/create/', createRouter);

//--------------------------------------------------------------------------Inicializace rout--------------------------------------------------------------------------//

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
