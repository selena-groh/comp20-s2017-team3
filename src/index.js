var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.set('port', (process.env.PORT || 5000));

// Mongo initialization and connect to database
// process.env.MONGOLAB_URI is the environment variable on Heroku for the MongoLab add-on
// process.env.MONGOHQ_URL is the environment variable on Heroku for the MongoHQ add-on
// If environment variables not found, fall back to mongodb://localhost/nodemongoexample
// nodemongoexample is the name of the database
var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nodemongoexample';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});


app.use(express.static(__dirname + '/public'));

// Mount the middleware at "/static" to serve static content only when their request path is prefixed with "/static".

    // GET /static/style.css etc.
    app.use('/static', express.static(__dirname + '/public'));


//app.use(express.static(__dirname + '/src'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/res', express.static(__dirname + '/res'));
//app.use('/css',express.static(__dirname + '/float_four.css'));
app.use('/js',express.static(__dirname + '/js'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/play.html', function(req,res) {
    res.sendFile(__dirname+'/play.html');
});


io.on('connection',function(socket){
    socket.on('newplayer',function(){
        socket.player = {
           //mongodb id?
        };
        socket.emit('allplayers',getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);
    });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}


io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        socket.join(room);
    });
});


room = "abc123";
io.sockets.in(room).emit('message', 'room joined');

// this message will NOT go to the client defined above


/*
app.post('/newgame', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");

  var board = request.body.board;

  if (board) {
    db.collection("games", function(error, coll) {
	  	if (error) {
		    console.log("Error: " + error);
		  	response.sendStatus(500);		  
		  } else {
			  coll.insert( { board: board }, function(error, insertedDocument) {
			  	var _id = JSON.stringify(insertedDocument._id);
			  	response.json({"_id": _id});
			  });
			}
		});
  } else {
  	response.json({"error":"Whoops, something is wrong with your data!"});
  }
});

app.post('/submit', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");

  var _id = request.body._id;
  var board = request.body.board;

  if (_id && board) {
    db.collection("games", function(error, coll) {
	  	if (error) {
		    console.log("Error: " + error);
		  	response.sendStatus(500);		  
		  } else {
			  coll.update(
			  	{ _id: _id},
			  	{
			  		_id: _id, // unnecessary?
			  		board: board,
			  	},
			  	{ upsert: true}
			  );
			}
		});
  } else {
  	response.json({"error":"Whoops, something is wrong with your data!"});
  }
});
*/

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


