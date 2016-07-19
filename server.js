"use strict";
var express = require("express");
var app = express();
var database = require('./database-manager.js');

app.use(express.static("public"));
app.listen(3000,function(){
	console.log("listening on port", 3000);
});

app.get('/register', function(request, response){
	database.findPersonByUsername(request.query.username, function(result){ return response.send(result);});
});

app.post('/register', function(request, response){
	database.createPerson(request.query.username, request.query.password, function(result){ return response.send(result);});
});

app.get('/login', function(request,response){
	database.verifyUsername(request.query.username, request.query.password, function(result){ response.send(result);});
});