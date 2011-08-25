var PORT = (process.env.VMC_APP_PORT || 3000)
  , HOST = (process.env.VCAP_APP_HOST || 'localhost');

var fs = require('fs')
  , express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app);

// Config
app.set('views', __dirname + '/views');
app.register('.html', require('ejs'));
app.set('view engine', 'html');

app.configure(function(){
  app.use(express.logger('\x1b[33m:method\x1b[0m \x1b[32m:url\x1b[0m :response-time'));
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});


//--------------------------------------------




app.get('/', function(req, res) {
  res.render('app/index');
});


io.sockets.on('connection', function (socket) {
  var ctr = 0;
  socket.on('scroll', function () {
    socket.emit('scroll-data', {html: "interesting data: " + ctr});
    ctr++;
  });
});




//--------------------------------------------


if (!module.parent) {
  app.listen(PORT);
  console.log('App started on port: ' + PORT);
}

module.exports = app;
