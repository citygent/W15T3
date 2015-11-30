'use strict'

var http = require('http')
var mongodb = require('mongodb')
var ObjectId = mongodb.ObjectId
var url = 'mongodb://localhost:27017'
var port = 8000

var server = http.createServer(function requestHandler (req, res) {
  console.log(req.method, req.url)

  if(req.url !== '/comments') {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({}));
  } else {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(result))
  }
})

var result = [];
var commentArray, userArray;

mongodb.MongoClient.connect(url, {}, function (err, connection) {
  if (err) console.log(err);
  var blog = connection.db('pinipa_exercise_blog');
  blog.collection('comments').find().toArray(function(err, commentData){
    if (err) result.push(err); // pushing errors to JSON response
    commentArray = commentData;
    // console.log(commentArray)
  });
  var global = connection.db('pinipa_exercise_global');
  global.collection('users').find().toArray(function(err, userData){
    if (err) result.push(err); // pushing errors to JSON response
    userArray = userData;

    for (var i = 0; i < commentArray.length; i++) {
      for (var j = 0; j < userArray.length; j++) {
        if (String(commentArray[i].user) === String(userArray[j]._id)) {
          var commentObj = {
            user: {}
          }
          commentObj._id = commentArray[i]._id;
          commentObj.user.firstName = userArray[j].first_name;
          commentObj.user.lastName = userArray[j].last_name;
          commentObj.date = commentArray[i].date;
          commentObj.content = commentArray[i].content;
          result.push(commentObj)
        }
      };
    };
    // console.log(userArray)
  })
  connection.close;
})

if (commentArray) {
  console.log('commentArray!')
}

if (userArray) {
  console.log('userArray!')
}

server.listen(port, function (){
  console.log('listening on port %d', port)
});