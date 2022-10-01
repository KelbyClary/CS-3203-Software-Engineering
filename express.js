var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');
var searchedArray = [];

//global variable for tweet data
var tweetinfo = []
var newArray = []
//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err, data) {
  if (err) {
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else {
    tweetinfo = JSON.parse(data);
    //for loop that adds the data from JSON file
    for (var index in tweetinfo) newArray.push({ "id": tweetinfo[index]["user"]["id"], "screenName": tweetinfo[index]["user"]["screen_name"], "name": tweetinfo[index]["user"]["name"], "text": tweetinfo[index]["text"], "created_at": tweetinfo[index]["created_at"] })
  }
});
//Get functions
//Shows user info
app.get('/tweets', function (req, res) {
  res.send({ newArray: newArray })
});
//Shows tweet info
app.get('/tweetinfo', function (req, res) {
  res.send({ newArray: newArray })
});
//Shows searched tweets
app.get('/searchinfo', function (req, res) {
  res.send({searchedArray: searchedArray})
})
//Posts created tweets
app.post('/tweetinfo', function (req, res) {
  var inputID = Number(req.body.id);
  var inputText = req.body.text;
  var todayDate = new Date();
  //Variable to get the current time for the create tweets
  var currentTime = todayDate.getHours() + ":" + todayDate.getMinutes() + ":" + todayDate.getSeconds();
 //Addes in a new element to the newArray
  newArray.push({
    id: inputID,
    name: 'Kelby',
    screenName: 'KelbyClary',
    text: inputText,
    created_at: currentTime
  })
});
//Posts searched tweets
app.post('/searchinfo', function (req, res) {
  var inputID = req.body.inputID;
  var searchArray = [];
  //for loop that when the current index id matches the inputID to update
  for (var index in newArray) {
    if (newArray[index]['id'] == inputID) {
      searchArray.push({ 'id': newArray[index]['id'], 'text': newArray[index]['text'], 'created_at': newArray[index]['created_at']});
      searchedArray.push({ 'id': newArray[index]['id'], 'text': newArray[index]['text'], 'created_at': newArray[index]['created_at']});
    } 
  }  
  res.send({searchArray:searchArray});
});
app.put('/tweets/:nm', function (req, res) {
  var input = req.params.nm;
  var inputNewScreenName = req.body.inputNewScreenName;//Variable to hold the new input screen name
  //For loop to handle when the user is looking for the new name 
  for (var key in newArray)
    if ((newArray[key]['name'] === input)) {
     newArray[key]['screenName'] = inputNewScreenName 
    };
});
//Delete 
app.delete('/tweetinfo/:tweetid', function (req, res) {
  var input = req.params.tweetid;
  //For loop that when the index of the id is equal to input set as a number then splice the index at position 1
  for (var index in newArray) {
    if (newArray[index]['id'] == Number(input)) {
      newArray.splice(index, 1)
    }
  }
});
app.listen(PORT, function () {
  console.log('Server listening on ' + PORT);
});