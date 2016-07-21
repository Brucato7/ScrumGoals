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
		database.findPersonByUsername(request.query.username, function(result){
			response.send(result);
		});
	})
	.post(function(request, response){
		database.createPerson(request.query.username, request.query.password, function(result){
			response.send(result);
		});
	});

app.route('/login')
	.get(function(request,response){
		database.verifyPerson(request.query.username, request.query.password, function(result){
			response.send(result);
		});
	});

app.route('/teamCreate')
	.get(function(request, response){
		database.checkTeamName(request.query.teamName, function(result){
			response.send(result);
		});
	});

app.route('/teamJoin')
	.get(function(request, response){
		database.findTeamByName(request.query.teamName, function(result){
			response.send(result);
		});
	});

app.route('/userTeams')
	.get(function(request, response){
		database.findUserTeams(request.query.userID, function(result){
			response.send(result);
		});
	});

app.route('/team')
	.get(function(request, response){
		database.findTeamById(request.query.teamID, function(result){
			response.send(result);
		});
	});

app.route('/userTeam')
	.get(function(request, response){
		database.checkUserTeam(request.query.person_id, request.query.team_id, function(result){
			response.send(result);
		});
	})
	.post(function(request, response){
		database.createUserTeam(request.query.person_id, request.query.team_id, request.query.boolean, function(result){
			response.send(result);
		});
	});

app.route('/teamMembers')
	.get(function(request, response){
		database.findUsersByTeamId(request.query.team_id, function(result){
			response.send(result);
		});
	});

app.route('/user')
	.get(function(request, response){
		database.findPersonById(request.query.id, function(result){
			response.send(result);
		});
	});

app.route('/tasks')
	.get(function(request, response){
		database.getTeamTasks(request.query.team_id, function(result){
			response.send(result);
		});
	})
	.post(function(request, response){
		database.createTask(request.query.goal, request.query.person_id, request.query.team_id, request.query.complete,
			function(result){
				response.send(result);
			})
	})
	.put(function(request, response){
		database.updateTask(request.query.task_id, request.query.person_id, request.query.complete,
			function(result){
				response.send(result);
			})
	});

app.route('/admin')
	.get(function(request, response){
		database.getAdminFromUserTeam(request.query.person_id, request.query.team_id,
			function(result){
				response.send(result);
			}
		)
	});