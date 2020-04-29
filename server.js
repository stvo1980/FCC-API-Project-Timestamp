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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get(
  "/api/timestamp/:date_string?",
  function(req, res, next) {
    var dateString = req.params.date_string;
  //  req.time = new Date().toString();
    var dateFormat = {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
    var result;
    //  console.log(req.time)
    if(isNaN(dateString)){
       var utc = new Date(dateString);
      utc = utc.toUTCString();
      var unix = new Date(dateString).getTime()/1000;
      result = {"unix":unix,  "utc": utc};
        
      
   
       }     
    else  {
      var unix = dateString;
      var utc = new Date(dateString*1000);
      utc = utc.toUTCString();
      result = {"unix":unix,  "utc": utc};
      
      
    }
   
    
  
    res.json(result);
  }
);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

