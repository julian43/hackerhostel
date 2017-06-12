// server.js

// BASE SETUP
// =============================================================================
var SQL = require('node-sql-db')
var db = new SQL.Db({
    platform: "MySQL",
    host:     "localhost",
    user:     "hackerhostel",
    password: "hacker#1",
    database: "my_test_db",
    schema: [{
        name: "Trucks",
        sql: ["create table if not exists trucks (id integer primary key, numtrucks integer)"]
    }]
});

db.execute("insert into trucks (id, numtrucks) values (0, 100)")
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path')
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
//router.get('/', function(req, res) {
//    res.json({ message: 'hooray! welcome to our api!' });   
//});

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + "/index.html"))
})

// more routes for our API will happen here
router.route("/trucks")
    .get(function(req,res){
        //return the numoftrucks in db
        db.query("select * from trucks where id=0", function(err, rows) {
            console.log(JSON.stringify(rows))
            res.json(rows);
        });

    })

router.route("/trucks/:sub_by")
    .get(function(req, res){
        var less_by = parseInt(req.params.sub_by);
        db.query("select * from trucks where id=0", function(err, rows) {
            currentTrucks = JSON.parse(JSON.stringify(rows))[0].numtrucks
            var numoftrucks = currentTrucks - less_by
            //console.log(less_by)
            //console.log(currentTrucks)
            db.execute("update trucks set numtrucks="+`${numoftrucks}`+" where id=0")
            res.json({"numtrucks":numoftrucks});
        });

        
    })
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/', express.static(__dirname))
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);