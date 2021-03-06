const express = require('express')
const path = require('path')
var http = require("http");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

const PORT = process.env.PORT || 3000;

// Standard Express Setup
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Route our scripts
app.use('/socket.io', express.static('node_modules/socket.io-client/dist'));
app.use('/jquery', express.static('node_modules/jquery/dist'));
app.use('/bootstrap', express.static('node_modules/bootstrap/'));
app.use(express.static(path.join(__dirname, 'public')));

// Establish the routes to our pages
app.use('/',routes);

// Define the render engine
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// Error Catch
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Error Catch
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// Socket IO 
var server = http.createServer(app);
var socketIO = require("socket.io").listen(server);

socketIO.sockets.on('connection', function (socket) {
    console.log("Clients... Clients everywhere");

    socket.on('disconnect', () => console.log('Client disconnected'));

    socket.on('alive', function(data) {
      console.log(data + " is Alive");
    });

    socket.on('instruction-for-listener1', function(data) {
      console.log("Message for the Listener 1 Trigger " + data);
      socket.broadcast.emit('listener1',data);
    });

    socket.on('instruction-for-listener2', function(data) {
      console.log("Message for the Listener 2 Trigger " + data);
      socket.broadcast.emit('listener2',data);
    });
});

setInterval(() => socketIO.emit('time', new Date().toTimeString()), 1000);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = app;
