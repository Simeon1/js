var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(bodyParser());
app.use(cors());
//app.use(app.router);

var rl = require("readline");
Rdio = require("./rdio");
var rdio = new Rdio(['6q535n9juuymj8bssexn8yc2', 'bSFvq3vwXY']);



var currentPlaylist = [];

////////////////////////////////////
//           flow
////////////////////////////////////

app.post('/upvote', function(req, res, next){
  res.contentType('text/json');

  var vote = req.body;
  console.log(vote);
  upvote(vote.pin, vote.song.title, vote.song.artist);
  res.send();
});

app.post('/downvote', function(req, res, next){
  res.contentType('text/json');

  var vote = req.body;
  console.log(vote);
  downvote(vote.pin, vote.song.title, vote.song.artist);
  res.send();
});


app.post('/playlist', function(req, res, next){
  res.contentType('text/json');

  var songs = req.body.songs;
  if(typeof songs != 'undefined'){
  	  console.log(songs);
	  enrichTracksFromRdio(songs);
	  queueSongs(req.body.pin, songs);
		  
	  function compare(a,b) {
	  	if (a.votes > b.votes)
	    	return -1;
	  	if (a.votes < b.votes)
	    	return 1;
	  	return 0;
	  }
  }
  currentPlaylist.sort(compare)

  res.send(currentPlaylist);
});

app.get('/getSong', function(req, res, next){
    res.contentType('text/json');
    console.log(req.query['songName']);
    var songName = req.query['songName']


	rdio.call("search", {"query": songName, "types":"Track"}, function (err, data) {
	if (err) {
	    console.log("ERROR: " + err);
	    done(i);
	    return;
	}

	if (data.result.length == 0){
		console.log("No results for query.");
		done(i);
	}

	var track = data.result.results[0];
	console.log(track);

	
	res.send("thanks!");
	});
});


var server = app.listen(3000, function() {
	authWithRdio();
    console.log('Listening on port %d', server.address().port);
});


////////////////////////////////////
//           functions
////////////////////////////////////

function upvote(pin, songName, artist){
	console.log('upvote for ' + songName + ' by ' + artist + ' in room ' + pin);
	for (var i = 0; i < currentPlaylist.length; i++) {
    	if(currentPlaylist[i].title === songName){
    		currentPlaylist[i].votes++;
    		break;
    	}
  	}
}

function downvote(ping, songName, artist){
	console.log('downvote for ' + songName + ' by ' + artist + ' in room ' + pins);
	for (var i = 0; i < currentPlaylist.length; i++) {
    	if(currentPlaylist[i].title === songName){
    		currentPlaylist[i].votes--;
    		break;
    	}
  	}
}

function queueSongs(pin, songs) {
  console.log("Got songs:");
  for (var i = 0; i < songs.length; i++) {
    currentPlaylist.push(songs[i]);
  }
}

function authWithRdio(){
	var i = rl.createInterface(process.stdin, process.stdout, null);

	// Authenticate against the Rdio service.
	rdio.beginAuthentication("oob", function (err, authUrl) {
	    if (err) {
	        console.log("ERROR: " + err);
	        done();
	        return;
	    }

	    console.log("Go to: " + authUrl);

	    // Prompt the user for the verifier code.
	    i.question("Then enter the code: ", function (verifier) {
	        rdio.completeAuthentication(verifier, function (err) {
	            if (err) {
	                console.log("ERROR: " + err);
	                done(i);
	                return;
	            }         

	        });
	    });
	});
}

function done(rdioInterface) {
	i.close();
	process.stdin.destroy();
}

function enrichTracksFromRdio(songs){
	console.log(songs);
	for(var j = 0; j < songs.length; j++){
		rdio.call("search", {"query": songs[j].title, "types":"Track"}, function (err, data, song) {
			if (err) {
			    console.log("ERROR: " + err);
			    done(j);
			    return;
			}

			if (data.result.length == 0){
				console.log("No results for query.");
				return;
			}

			var track = data.result.results[0];
			console.log("the track " + track);
			console.log("the song " + song);
			song.icon = track.icon;
			song.key = track.key
			

		}, songs[j]);
	}
}

function handleRdioCallbackData(track){
	

}
