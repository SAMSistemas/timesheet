angular.module('myApp')
    .controller('loginController', function ($scope, $http) {

    $scope.user = "";
    $scope.name = "";
    $scope.pass = "";

    $scope.storeData = function() {
        /* Putting user credentials in session storage */
        sessionStorage.setItem("username", $scope.user);
        $http.get('/person/show/'+$scope.user).then(function(response){
            var user = response.data;
            $scope.name = user.name+' '+user.lastname;
            sessionStorage.setItem("name", $scope.name);
        });
    };

    $scope.searchName = function() {
        $scope.user = sessionStorage.getItem("username");
        $scope.name = sessionStorage.getItem("name");
    };

    $scope.logOut = function() {
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("name");
    };

});