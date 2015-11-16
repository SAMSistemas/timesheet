angular.module('myApp')
    .controller('loginController', function ($scope, $http) {

    $scope.user = "";
    $scope.name = "";

    $scope.storeData = function() {
        sessionStorage.setItem("username", $scope.user);
    };

    $scope.searchName = function() {

        if (sessionStorage.getItem("name") === null) {
            $http.get('/person/show/' + $scope.user).then(function(response){
                var user = response.data;
                $scope.name = user.name + ' ' + user.lastname;
                sessionStorage.setItem("name", $scope.name);
            }, function () {

            });
        }

        $scope.user = sessionStorage.getItem("username");
        $scope.name = sessionStorage.getItem("name");
    };

    $scope.logOut = function() {
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("name");
    };

});