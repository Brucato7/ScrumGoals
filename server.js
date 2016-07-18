"use strict";
var express = require("express");
var app = express();
var database = require('./database-manager.js');

app.use(express.static("public"));
app.listen(3000,function(){
	console.log("listening on port", 3000);
});

app.get('/register', function(request, response){
	database.readTeam(request.query.teamName, database.partialCreatePerson(request.query.username, request.query.password));
});