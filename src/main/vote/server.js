var DIRECTION_UP = 'up';
var DIRECTION_DOWN = 'down'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());



//
var currentPlaylist = [];

////////////////////////////////////
//           flow
////////////////////////////////////

app.post('/upvote', function(req, res){
  res.contentType('text/json');

  var vote = req.body;
  console.log(vote);
  upvote(vote.pin, vote.song.title, vote.song.artist);
  res.send();
});

app.post('/downvote', function(req, res){
  res.contentType('text/json');

  var vote = req.body;
  console.log(vote);
  downvote(vote.pin, vote.song.title, vote.song.artist);
  res.send();
});


app.post('/playlist', function(req, res){
  res.contentType('text/json');

  var songs = req.body.songs;
  queueSongs(req.body.pin, songs);
  res.send(currentPlaylist);
});



var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});





////////////////////////////////////
//           functions
////////////////////////////////////

function upvote(pin, songName, artist){
	console.log('upvote for ' + songName + ' by ' + artist + ' in room ' + pin);	
}

function downvote(ping, songName, artist){
	console.log('downvote for ' + songName + ' by ' + artist + ' in room ' + pins);
}

function queueSongs(pin, songs) {
  console.log("Got songs:");
  for (var i = 0; i < songs.length; i++) {
    currentPlaylist.push(songs[i]);
  }
}
