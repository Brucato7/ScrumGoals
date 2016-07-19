"use strict";
var express = require("express");
var app = express();
var database = require('./database-manager.js');

app.use(express.static("public"));
app.listen(3000,function(){
	console.log("listening on port", 3000);
});

app.route('/register')
	.get(function(request, response){
		database.findPersonByUsername(request.query.username, function(result){ return response.send(result);});
	})
	.post(function(request, response){
		database.createPerson(request.query.username, request.query.password, function(result){ return response.send(result);});
	});

app.route('/login')
	.get(function(request,response){
		database.verifyPerson(request.query.username, request.query.password, function(result){ response.send(result);});
	});

app.route('/teamCreate')
	.get(function(request, response){
		database.checkTeamName(request.query.teamName, function(result){ return response.send(result);});
	});

app.route('/teamJoin')
	.get(function(request, response){
		database.findTeamByName(request.query.teamName, function(result){ return response.send(result);});
	});

app.route('/userTeams')
	.get(function(request, response){
		database.findUserTeams(request.query.userID, function(result){ return response.send(result);});
	});

app.route('/team')
	.get(function(request, response){
		database.findTeamById(request.query.teamID, function(result){ return response.send(result);});
	});