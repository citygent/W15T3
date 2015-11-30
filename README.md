# Mongo Code Test

* Import supplied data into your local MongoDB instance
>	JW: I used MongoImport without success for some time before realising MongoRestore was the way to go. This is my first time importing BSON into a Mongo Instance. 


* Using the official Node.js MongoDB driver (v2.x branch) and Node's HTTP module complete the script:
>	JW: I'm assuming you want me to do this WITHOUT Express and Mongoose. I've not built anything without using these but I like a challenge and deeper understanding so will do.
>	
>	I understand that Mongoose and Express afford me a nice DSL to work with, along with some funky convenience classes and methods, but I enjoyed being closer to the metal using only HTTP and the Driver, and like how lean everything is kept.

  - When navigating to `http://localhost:8000/comments` respond with all comments in the database, use the `.toArray` method provided by the driver
>	JW: Done, I eventually refactored so it performs a DB query and processing on every GET. 

  - In the `/comments` response, inline user objects instead of sending the user id (but don't include the `_id` field in the user objects)
>	JW: Done, still leaving the comment _id in place though this should be easy to remove if oversight. 

  - Replace the ISO date string with a _nicer_ formatted date suitable for displaying on a web page
>	JW: I've only worked with `Moment.js` and it seems a bit heavy-handed here, it would also be a bit heavy handed to write my own complicated formatting function.

  - Check for errors and if there are any send an appropriate response to the client
>	JW: I think I am doing this, it's difficult for me to test apologies. 

  - Ensure all responses are in JSON
>	JW: Yep.

  - For anything other than `/comments` just send a blank JSON document
>	JW: Yep.
