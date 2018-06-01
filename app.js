const express = require('express')
const path = require('path')
var http = require("http");
var socketIO = require("socket.io");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

const PORT = process.env.PORT || 5000
const SOCKET_PORT = process.env.SOCKET_PORT || 5100

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/socket.io', express.static('node_modules/socket.io-client/dist'));
app.use('/jquery', express.static('node_modules/jquery/dist'));
app.use('/bootstrap', express.static('node_modules/bootstrap/'));

app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'jade'); // converts Jade to HTML before sending
app.set('views', path.join(__dirname, 'views'));

  
app.get('/', (req, res) => res.render('index'))

app.get('/shepard', function(req, res, next) {
  res.render('shepard', { title: 'Shepard' });
});

app.get('/sheep', function(req, res, next) {
  res.render('sheep', { title: 'Sheep' });
});

app.get('/wolf', function(req, res, next) {
  res.render('wolf', { title: 'Wolf' });
});



var io = socketIO.listen(app);
io.sockets.on('connection', function (socket) {
    socket.emit('message',"Hello World from the Server");

    socket.on('alive', function(data) {
        console.log(data + " is Alive");
    });

    socket.on('instruction-for-wolf', function(data) {
      console.log("Message for the Wolf Trigger " + data);
      socket.broadcast.emit('wolf',data);
    });

    socket.on('instruction-for-sheep', function(data) {
      console.log("Message for the Sheep Trigger " + data);
      socket.broadcast.emit('sheep',data);
    });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

module.exports = app;

// var http = require('http');
// var fs = require('fs');
// var path = require('path');
//
// // Loading the index file . html displayed to the client
// var server = http.createServer(function(request, response) {
//   // console.log(request.url);
//
//   var filePath = '.' + request.url;
//   if (filePath == './')
//       filePath = './index.html';
//
//   var extname = path.extname(filePath);
//   var contentType = 'text/html';
//   switch (extname) {
//       case '.js':
//           contentType = 'text/javascript';
//           break;
//       case '.css':
//           contentType = 'text/css';
//           break;
//       case '.json':
//           contentType = 'application/json';
//           break;
//       case '.png':
//           contentType = 'image/png';
//           break;
//       case '.jpg':
//           contentType = 'image/jpg';
//           break;
//       case '.wav':
//           contentType = 'audio/wav';
//           break;
//       case '.mp3':
//           contentType = 'audio/mp3';
//           break;
//   }
//
//   fs.readFile(filePath, function(error, content) {
//       if (error) {
//           if(error.code == 'ENOENT'){
//               fs.readFile('./404.html', function(error, content) {
//                   response.writeHead(200, { 'Content-Type': contentType });
//                   response.end(content, 'utf-8');
//               });
//           }
//           else {
//               response.writeHead(500);
//               response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
//               response.end();
//           }
//       }
//       else {
//           response.writeHead(200, { 'Content-Type': contentType });
//           response.end(content, 'utf-8');
//       }
//   });
//
// });
//
// // Loading socket.io
// var io = require('socket.io').listen(server);
//
// io.sockets.on('connection', function (socket) {
//     socket.emit('message',"Hello World from the Server");
//
//     socket.on('alive', function(data) {
//         console.log(data + " is Alive");
//     });
//
//     socket.on('instruction-for-wolf', function(data) {
//       console.log("Message for the Wolf Trigger " + data);
//       socket.broadcast.emit('wolf',data);
//     });
//
//     socket.on('instruction-for-sheep', function(data) {
//       console.log("Message for the Sheep Trigger " + data);
//       socket.broadcast.emit('sheep',data);
//     });
// });
//
//
//
//
//
// server.listen(8080);



// /*******************************************************************************
// This is a simple chat server that adds a new message to all other users' view
// without needed a page refresh, and all automatically.
// It uses the following frameworks:
// 	* node.js allows us to run JavaScript on the backend
// 	* express.js makes routing and other basic backend tasks easy
// 	* socket.io uses Web sockets to share data between the client and server
// 	* Jade is like a pretty version of HTML that makes it look like JS
// Before using this, open a terminal and make sure NPM is installed by running:
// 	npm -v
// If it returned an error, find a guide for installing it on your platform
// Then, install all the frameworks you need by running:
// 	npm install
// To start the Chatte server, run the following:
// 	node app
// Then open the port that the log specified on 2 windows or tabs.
// You will then be able to type messages and it will sync.
// This is made by @AbhinavMadahar on GitHub
// Big thanks to Smitha Milli's tutorial on Socket.io: http://goo.gl/7rbwHT
// *******************************************************************************/

// // all the frameworks we will be using
// var express = require('express');
// var http = require("http");
// var socketio = require("socket.io");
// var path = require('path');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var routes = require('./routes/index');


// // make the server and start listening to it with all the frameworks above
// var app = express(); // make an Express app
// var server = http.createServer(app); // HTTP server based on Express app
// var io = socketio.listen(server); // Socket now listening to HTTP server

// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());~

// app.set('view engine', 'jade'); // converts Jade to HTML before sending
// app.set('views', path.join(__dirname, 'views'));

// // app.use('/', routes);

// // if a GET request is made for the homepage, render index.jade and send it
// // app.get('/', function(req, res) {
// // 	res.render('index');
// // 	// sending is implicit
// // });

// /* GET home page. */
// app.get('/', function(req, res, next) {
//   res.render('index', { title: 'Index' });
// });

// // /* GET home page. */
// // app.get('/shepard', function(req, res, next) {
// //   res.render('shepard', { title: 'Shepard' });
// // });

// // /* GET home page. */
// // app.get('/sheep', function(req, res, next) {
// //   res.render('sheep', { title: 'Sheep' });
// // });

// // /* GET home page. */
// // app.get('/wolf', function(req, res, next) {
// //   res.render('wolf', { title: 'Wolf' });
// // });

// // a web socket is a 2-way connection between a server and client
// // if a socket sends a 'connection' message, start accepting requests from it
// io.sockets.on('connection', function(socket) {
// 	// console.log("Hello Connection");
// 	// when a 'send message' message is sent along with some data...
// 	socket.on('send', function(data) {
// 		// use the web sockets to emit the message to everyone else
// 		io.sockets.emit('new message', data);

// 		console.log('Someone posted:', data); // make a log entry
// 	});
// });

// // start the HTTP server
// var port = process.env.PORT || 3000; // if no port was supplied, use 3000
// server.listen(port); // start listening to new requests
// console.log('Chatte is now online on port', port);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


// module.exports = app;
