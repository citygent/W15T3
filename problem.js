'use strict'

var http = require('http')
var mongodb = require('mongodb')
var ObjectId = mongodb.ObjectId
var blogUrl = 'mongodb://localhost:27017/pinipa_exercise_blog'
var globalUrl = 'mongodb://localhost:27017/pinipa_exercise_global'
var port = 8000

var server = http.createServer(function requestHandler (req, res) {
  console.log(req.method, req.url)

  if(req.url !== '/comments') {
    res.writeHead(200, {'Content-Type': 'application/json'})
    var json = {
      Document: "Blank JSON" // trololol
    }
    res.end(JSON.stringify(json))
  } else {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(result))
  }
})

var result;

mongodb.MongoClient.connect(blogUrl, {}, function (err, connection) {
  if (err) throw err;

  connection.collection('comments').find().toArray(function(err, commentData){
      getUsers(commentData);
    })
  connection.close;
})

function getUsers(comments){
  mongodb.MongoClient.connect(globalUrl, {}, function (err, connection) {
  if (err) throw err;
  for (var i = comments.length - 1; i >= 0; i--) {
    console.log(comments[i].user)
    connection.collection('users').findOne({_id: ObjectId(comments[i].user)}, function(err, userData){
      console.log(userData);
    })
  };
  connection.close;
  })
}

server.listen(port, function (){
  console.log('listening on port %d', port)
});

