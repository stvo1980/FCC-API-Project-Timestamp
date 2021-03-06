// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get(
  "/api/timestamp/:date_string?",
  function(req, res, next) {
    var dateString = req.params.date_string;
        var result;
 //   var check = Number(dateString);
 //   console.log("check", check)
    var test = new Date(dateString).getTime();
 //   console.log('test', test)
    //if empty
   if(dateString == null) {
     var utc = new Date(Date.now());
         utc = utc.toUTCString();
    var  unix = new Date(utc).getTime();
      result = {"unix":unix,  "utc": utc};
    }    
    //if not a  number
   else if(isNaN(dateString)){
     if(isNaN(test)){
       result = {"error" : "Invalid Date" }
     } else {
      var utc = new Date(dateString);
      utc = utc.toUTCString();
      var unix = new Date(dateString).getTime();
      result = {"unix":unix,  "utc": utc};}
            
       } 
    //unix number input 
    else { 
      var unix = dateString;
      var utc = new Date(Number(dateString));
      utc = utc.toUTCString();
      result = {"unix":unix,  "utc": utc};
     }
    res.json(result);
  })

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

