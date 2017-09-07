var express = require('express');//import expressJS
var app = express();
var routes = require('./routes');//modularized routing
var port = 3000;
var sqlite3 = require('sqlite3'); //import sqlite3
var db = new sqlite3.Database('PatientDoctor.db'); //PatientDoctor database


app.set('view engine', 'ejs'); //Bring in EJS template engine

app.get('/', routes.index); //Index route

app.get('/about', routes.about); //About route

app.get('/patients', function(request, response){
    db.all("SELECT * FROM Patient", function(err, rows){
        console.log("GET Patients: The database currently contains the following:" + rows.length + "Record(s)") ;
        console.log("First Patient is " + rows[0].FirstName + ' ' + rows[0].LastName);
        response.render('patients', {'sql': rows
            });

    });
});//Passing records from SQLite to patients.ejs template

app.post('/patients', function(request, response){
    db.run("INSERT INTO Patients (FirstName, LastName, Email, DOB, CaseDescription) VALUES ?", request.body)
})//Patient form post route

app.get('*', routes.badroute); //Handle bad routing

app.listen(port, function(){
    console.log("Express app listening on port " + port);
});