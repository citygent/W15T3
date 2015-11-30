# exercise

* import supplied data into your local MongoDB instance
JW: Used MongoImport without success for some time before realising MongoRestore was the way to go.


* using the official Node.js MongoDB driver (v2.x branch) and Node's HTTP module complete the script:
JW: I'm assuming you want me to do this WITHOUT Express and Mongoose. I've not built anything without using these but I like a challenge and deeper understanding so will do.

  - when navigating to `http://localhost:8000/comments` respond with all comments in the database, use the `.toArray` method provided by the driver
  JW: Done, refactored so it performs a DB query and processing on every GET. 

  - in the `/comments` response, inline user objects instead of sending the user id (but don't include the `_id` field in the user objects)
  JW: DOne, still leaving the comment _id in place though. 

  - replace the ISO date string with a _nicer_ formatted date suitable for displaying on a web page
  JW: I've only worked with Moment and it seems a bit heavy-handed here, it would also be a bit heavy handed to write a complicated function.

  - check for errors and if there are any send an appropriate response to the client
  JW: I think I am doing this, it's difficult for me to test apologies. 

  - ensure all responses are in JSON
  JW: Yep.

  - for anything other than `/comments` just send a blank JSON document
  JW: Yep.
