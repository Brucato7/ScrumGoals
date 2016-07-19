"use strict";
	var app = angular.module('scrumApp', []);

	app.controller('goalsCtrl', function($scope, $http, showFields, userData){
		$scope.showGoals = function(){return showFields.showGoals;};
		$scope.teamGoals = [];
		$scope.teamMembers = [];
	});

	app.controller('teamCtrl', function($scope, $http, showFields, userData){
		$scope.newTeamError = '';
		$scope.teamError = '';
		$scope.newTeamName = '';
		$scope.userTeamId = '';
		$scope.showTeam = function(){ return showFields.showTeam;};
		$scope.showTeamLogin = function(){ return showFields.showTeamLogin;};
		$scope.showTeamRegister = function(){ return showFields.showTeamRegister;};
		$scope.userID = function(){ return userData.userID;};
		$scope.username = function(){ return userData.username;};
		$scope.userTeams = function(){ return userData.userTeams;};

		$scope.checkTeamName = function(){
			$scope.newTeamError = '';
			if($scope.newTeamName.length < 3){
				$scope.newTeamError = "Team names must be at least 3 characters.";
			}else {
				$http({
					method: 'GET',
					url: '/teamCreate',
					params: {teamName: $scope.newTeamName}
				}).then(function successCallback(data){
					if(data.data.err != undefined){
						$scope.newTeamError = data.data.err;
					} else {
						$scope.createUserTeam($scope.userID(), data.data.rows[0].id, true);
					}
				}, function errorCallback(error){
					console.log(error);
				})
			}
		};

		$scope.joinTeam = function(){
			$scope.teamError = '';
			$http({
					method: 'GET',
					url: '/teamJoin',
					params: {teamName: $scope.teamName}
				}).then(function successCallback(data){
					if(data.data.err != undefined){
						$scope.teamError = data.data.err;
					} else {
						$scope.checkUserTeam(data.data.rows[0].id);
					}
				}, function errorCallback(error){
					console.log(error);
				})
		}

		$scope.checkUserTeam = function(team_id){
			$http({
				method: 'GET',
				url: '/userTeam',
				params: {person_id: $scope.userID(), team_id: team_id}
			}).then(function successCallback(data){
				if(data.data.err != undefined){
					$scope.teamError = data.data.err;
				} else {
					$scope.createUserTeam($scope.userID(), team_id, false);
				}
			}, function errorCallback(error){
				console.log(error);
			})
		};

		$scope.createUserTeam = function(person_id, team_id, boolean){
			$http({
				method: 'POST',
				url: '/userTeam',
				params: {person_id: person_id, team_id: team_id, boolean: boolean}
			}).then(function successCallback(data){
				console.log(data);
			}, function errorCallback(error){
				console.log(error);
			})
		};
		
	});

	app.controller('entranceCtrl', function($scope, $http, showFields, userData){
		$scope.loginError = '';
		$scope.registerError = '';
		$scope.newPassword = '';
		$scope.newUsername = '';
		$scope.showEntrance = function(){return showFields.showEntrance;};

		$scope.registerUser = function(){
			$http({
				method: 'POST',
				url: '/register',
				params: {username: $scope.newUsername, password: $scope.newPassword}
			}).then(function successCallback(data){
				userData.username = $scope.newUsername;
				userData.userID = data.data.rows[0].id;
				showFields.showEntrance = false;
				showFields.showTeam = true;
				showFields.showTeamRegister = true;
			}, function errorCallback(error){
				console.log("The Error of POST is firing...");
			})
		};

		$scope.checkUsername = function(){
			$scope.registerError = '';
			if($scope.newUsername.length < 3){
				$scope.registerError = "Username must be at least 3 characters.";
			} else if($scope.newPassword.length < 3){
				$scope.registerError =  "Password must be at least 3 characters.";
			}else {
				$http({
					method: 'GET',
					url: '/register',
					params: {username: $scope.newUsername}
				}).then(function successCallback(data){
					if(data.data.err != undefined){
						$scope.registerError = data.data.err;
					} else {
						$scope.registerUser();
					}
				}, function errorCallback(error){
					console.log(error);
				})
			}
		};

		$scope.login = function() {
			$scope.loginError = '';
			$http({
				method: "GET",
				url: '/login',
				params: {username: $scope.username, password: $scope.password}
			}).then(function successCallback(data){
				if(data.data.err != undefined){
					$scope.loginError = data.data.err;	
				} else {
					userData.username = $scope.username;
					userData.userID = data.data.rows[0].id;
					$scope.findUserTeams(userData.userID);
					showFields.showEntrance = false;
					showFields.showTeam = true;
					showFields.showTeamLogin = true;
				}
			}, function errorCallback(error){
				console.log(error);
			});
		};

		$scope.findUserTeams = function(userID){
			$http({
				method: 'GET',
				url: '/userTeams',
				params: {userID: userID}
			}).then(function successCallback(data){
				for(var i = 0; i < data.data.rows.length; i++){
					$scope.findTeam(data.data.rows[i].team_id);
				}
			}, function errorCallback(error){
				console.log(error);
			})
		};

		$scope.findTeam = function(teamID){
			$http({
				method: 'GET',
				url: '/team',
				params: {teamID: teamID}
			}).then(function successCallback(data){
				userData.userTeams.push(data.data.rows[0]);
			}, function errorCallback(error){
				console.log(error);
			})
		};

	});

	app.service('showFields', function(){
		this.showEntrance = true;
		this.showTeam = false;
		this.showGoals = false;
		this.showTeamLogin = false;
		this.showTeamRegister = false;
	});

	app.service('userData', function(){
		this.username = '';
		this.userID = '';
		this.teamName = '';
		this.teamID = '';
		this.userTeams = [];
	});