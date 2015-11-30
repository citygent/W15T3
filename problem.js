'use strict' // be careful!

var http = require('http')
var mongodb = require('mongodb')
var ObjectId = mongodb.ObjectId
var url = 'mongodb://localhost:27017'
var port = 8000

var server = http.createServer(function requestHandler (req, res) {
  console.log(req.method, req.url); // Some very basic logging to node console on requests. 

  if(req.url !== '/comments') {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({})); // unless comments is hit, send an empty object. Would like to put in proper responses and errors/404s later.
  } else {
    res.writeHead(200, {'Content-Type': 'application/json'}) // correct content type for JSON responses. 

    var result = []; // this is what we'll eventually render in JSON.
    var commentArray, userArray; // these hold the mongo documents in memory. I found it too difficult to query each user based on comments, apologies. 

    mongodb.MongoClient.connect(url, {}, function (err, connection) {
      if (err) console.log(err); // this error only gets pushed to node console. 
      var blog = connection.db('pinipa_exercise_blog'); // connects to 'blog' DB on Mongo 'server' above.
      blog.collection('comments').find().toArray(function(err, commentData){ // gets all, and makes an array
        if (err) result.push(err); // pushing errors to JSON response, untested.
        commentArray = commentData; // caching response for use below.
      });
      var global = connection.db('pinipa_exercise_global'); // connects to 'global' DB on Mongo 'server' above.
      global.collection('users').find().toArray(function(err, userData){
        if (err) result.push(err); // pushing errors to JSON response, untested.
        userArray = userData; // for every comment, iterate through users array and find an user ID match. 
        for (var i = 0; i < commentArray.length; i++) {
          for (var j = 0; j < userArray.length; j++) {
            if (String(commentArray[i].user) === String(userArray[j]._id)) { // if user ID match, build a new object with user inlined. Ommit the user _id. 
              var commentObj = {
                user: {}
              }
              commentObj._id = commentArray[i]._id;
              commentObj.user.firstName = userArray[j].first_name;
              commentObj.user.lastName = userArray[j].last_name;
              commentObj.date = commentArray[i].date.toGMTString(); // nicer formatting, simple as possible. 
              commentObj.content = commentArray[i].content;
              result.push(commentObj) // push this new comment-user object into the result array. 
            }
          };
        };
        res.end(JSON.stringify(result)) // when done looping, render the result array as JSON.
      })
      connection.close; // close DB connection/best practice.
    })
  };
});

server.listen(port, function (){
  console.log('listening on port %d', port) // ensure server starts and is listening. 
});