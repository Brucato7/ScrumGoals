"use strict";
	var app = angular.module('scrumApp', []);

	app.controller('goalsCtrl', function($scope, $http, showFields, userData){
		$scope.showGoals = function(){return showFields.showGoals;};
		$scope.teamGoals = [];
		$scope.teamMembers = [];
	});

	app.controller('teamCtrl', function($scope, $http, showFields, userData){
		$scope.showTeam = function(){ return showFields.showTeam;};
		$scope.joinTeam = function(){
			$http({
				method: 'GET',
				url: '/register',
				params: {username: userData.username, password: userData.password, teamName: $scope.teamName}
			}).then(function successCallback(data){
				console.log(data);
			}, function errorCallback(error){
				console.error(error);
			});
		};
	});

	app.controller('entranceCtrl', function($scope, $http, showFields, userData){
		$scope.showEntrance = function(){return showFields.showEntrance;};
		$scope.register = function(){
			userData.username = $scope.newUsername;
			userData.password = $scope.newPassword;
			showFields.showEntrance = false;
			showFields.showTeam = true;
		}

	});

// 	app.controller('registerCtrl', function($scope, $http, displayService) {
//     $scope.showRegister = function(){return displayService.showRegister;};
//     $scope.addRegistrants = function() {
//         $http({
//             method: "POST",
//             url: "/users",
//             data: {username: $scope.newUsername, password: $scope.newPassword}
//         }).then(function successCallback(data) {
//             return true;
//         },
//         function errorCallback(error) {
//             return false;
//         });
//     };
// });

	app.service('showFields', function(){
		this.showEntrance = true;
		this.showTeam = false;
		this.showGoals = false;
	});

	app.service('userData', function(){
		this.username = '';
		this.password = '';
		this.teamName = '';
	});