var express = require('express');//import expressJS
var app = express();
var routes = require('./routes');//modularized routing
var port = 3000;
var sqlite3 = require('sqlite3'); //import sqlite3
var db = new sqlite3.Database('PatientDoctor.db'); //PatientDoctor database


app.set('view engine', 'ejs'); //Bring in EJS template engine

app.get('/', routes.index); //Index route

app.get('/about', routes.about); //About route

app.get('/:name?', (request, response) => {
    
    let name = request.params.name;
    let sql = 'SELECT * FROM Patient WHERE FirstName = ?';
    
    db.each(sql, name,(err, row) => {
        if(err){
            throw err;
        }
        
        console.log(row.FirstName + ' ' + row.LastName);
        
        response.render('patient', {'sql': row
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