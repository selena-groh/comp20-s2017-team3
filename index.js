var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db;
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', (process.env.PORT || 5000));

// Mongo initialization and connect to database
// process.env.MONGOLAB_URI is the environment variable on Heroku for the MongoLab add-on
// process.env.MONGOHQ_URL is the environment variable on Heroku for the MongoHQ add-on
// If environment variables not found, fall back to mongodb://localhost/nodemongoexample
// nodemongoexample is the name of the database
var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nodemongoexample';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, dC) {
	if(error) return;

	db = dC.createCollection('stats', function(err, collection) {});
});

function insertWin(player, placed) {
	db.insert({
		winner: player,
		time: Date.now(),
		pieces: placed
	});
}

app.use(express.static(__dirname + '/src'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/res', express.static(__dirname + '/res'));
// https://github.com/tuftsdev/WebProgramming/blob/gh-pages/examples/nodejs/nodemongoapp/server.js
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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


