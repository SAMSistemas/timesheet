angular.module('myApp')
    .controller('loginController', function ($scope, $http, $window) {

        $scope.user = "";
        $scope.pass = "";
        $scope.name = "";

        $scope.login = function () {
            $http.post('/login?username=' + $scope.user + "&password=" + $scope.pass).then(function () {
                $window.location.href = '/';
            }, function () {
                $scope.errorMsg = "El usuario y/o la contraseña son incorrectos"
            });
        };

        $scope.logOut = function () {
            $http.post("/login").then(function () {
            }, function () {
                $window.location.href = '/login';
            }, function () {

            });

            sessionStorage.removeItem("username");
            sessionStorage.removeItem("name");
        };

        $scope.storeData = function () {
            sessionStorage.setItem("username", $scope.user);
        };

        $scope.searchName = function () {

            $scope.user = sessionStorage.getItem("username");

            if (sessionStorage.getItem("name") === null) {
                $http.get('/person/show/' + $scope.user).then(function (response) {
                    var user = response.data;
                    $scope.name = user.name + ' ' + user.lastname;
                    sessionStorage.setItem("name", $scope.name);
                }, function () {

                });
            }

            $scope.name = sessionStorage.getItem("name");
        };

    });