var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = []
var newArray = []
//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    tweetinfo = JSON.parse(data);
    for(var index in tweetinfo) newArray.push({ "id": tweetinfo[index]["user"]["id"], "screenName": tweetinfo[index]["user"]["screen_name"], "name": tweetinfo[index]["user"]["name"], "text": tweetinfo[index]["text"], "created_at": tweetinfo[index]["created_at"]})
    
      }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  res.send({newArray: newArray})
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info
  res.send({newArray: newArray})
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets

});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.

});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
});

//Update
app.put('/tweets/:nm', function(req, res) {
  //TODO: update tweets
});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //TODO: delete a tweet

});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});