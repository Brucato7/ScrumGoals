describe('scrumApp', function(){
    beforeEach(module('scrumApp'));

    var $controller, $scope;

    beforeEach(inject(function($controller, $rootScope){
        $scope = $rootScope.$new();
        createController = function(ctrl){
            return $controller(ctrl, {'$scope': $scope});
        }
    }));

    describe('entranceCtrl.checkUsername', function(){
        it('should make sure username is > then 3 characters', function() {
            var controller = createController('entranceCtrl');
            $scope.newUsername = "po";
            $scope.registerError = '';
            $scope.checkUsername();
            expect($scope.registerError).toBe("Username must be at least 3 characters.");
        });
        it('should ensure password is > then 3 characters', function() {
            var controller = createController('entranceCtrl');
            $scope.newUsername = "luke";
            $scope.newPassword = "ab";
            $scope.registerError = '';
            $scope.checkUsername();
            expect($scope.registerError).toBe("Password must be at least 3 characters.");
        });
        
    });
    describe('teamCtrl.checkTeamName', function(){
        it('should check if team name is > 3 characters', function(){
            var controller = createController('teamCtrl');
            $scope.newTeamName = "lu";
            $scope.newTeamError = '';
            $scope.checkTeamName();
            expect($scope.newTeamError).toBe("Team names must be at least 3 characters.");
        });
    });
    describe('teamCtrl.showFunctions', function(){
        it('should get showTeam value from display service', function(){
            var controller = createController('teamCtrl');
            var showFields = {
                showTeam: false
            }
            expect($scope.showTeamLogin()).toEqual(false);
        });
        it('should get showTeamLogin value from display service', function(){
            var controller = createController('teamCtrl');
            var showFields = {
                showTeamLogin: false
            }
            expect($scope.showTeamLogin()).toEqual(false);
        });
        it('should get showTeamRegister value from display service', function(){
            var controller = createController('teamCtrl');
            var showFields = {
                showTeamRegister: false
            }
            expect($scope.showTeamRegister()).toEqual(false);
        });
    });
    describe('goalsCtrl.showFunctions', function(){
        it('should get showGoals value from display service', function(){
            var controller = createController('goalsCtrl');
            var showFields = {
                showGoals: false
            }
            expect($scope.showGoals()).toEqual(false);
        });
        it('should get adminView value from display service', function(){
            var controller = createController('goalsCtrl');
            var showFields = {
                adminView: false
            }
            expect($scope.adminView()).toEqual(false);
        });
        it('should get userView value from display service', function(){
            var controller = createController('goalsCtrl');
            var showFields = {
                userView: false
            }
            expect($scope.userView()).toEqual(false);
        });
    });
    describe('entranceCtrl.showFunctions', function(){
        it('should get showEntrance value from display service', function(){
            var controller = createController('entranceCtrl');
            var showFields = {
                showEntrance: true
            }
            expect($scope.showEntrance()).toEqual(true);
        });
    });
});

