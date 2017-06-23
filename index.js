var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000, function() {
	console.log('Running server 127.0.0.1:3000');
});

app.get('/', function(request, response) {
	response.send('Hello World');
});

app.get('/home', function(request, response) {
	response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	socket.on('chat.message', function(messages) {
		io.emit('chat.message', messages);
	});

	socket.on('disconnect', function() {
		io.emit('chat.message', {text: 'User disconnected.'});
	});
});
