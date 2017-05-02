var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

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

app.use(express.static(__dirname + '/src'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/res', express.static(__dirname + '/res'));

app.post('/submitWin', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");

  var winner = request.body.winner;
  var currentWins;

  if (winner === undefined) {
  	response.json({"error":"Whoops, something is wrong with your data!"});
  } else {
    db.collection("wins", function(error, coll) {
	  	if (error) {
		    console.log("Error: " + error);
		  	response.sendStatus(500);
			} else {
				coll.find({player: winner}).toArray(function(error, documents) {
					var document = documents[0];
				  if (document) {
				  	currentWins = document.wins + 1;
				  	coll.update(
						 	{ player: winner},
						 	{
						 		player: winner,
						 		wins: currentWins
						 	},
						 	{ upsert: true}
						);
				  } else {
				  	currentWins = 1;
				  	coll.update(
						 	{ player: winner},
						 	{
						 		player: winner,
						 		wins: currentWins
						 	},
						 	{ upsert: true}
						);
				  }
				});
			}
		});
  }
});

app.get('/stats.json', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
	db.collection("wins", function(error, coll) {
	  if (error) {
	    console.log("Error: " + error);
	  	response.sendStatus(500);		  
	  } else {
			coll.find().toArray(function(error, documents) {
				response.send(JSON.stringify(documents));
			});
		}
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


