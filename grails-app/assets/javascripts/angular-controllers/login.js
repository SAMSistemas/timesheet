//= require default
//= require_self

app.controller('loginController', function ($scope, $http, $window) {

        $scope.user = "";
        $scope.pass = "";
        $scope.name = "";

        $scope.login = function () {
            $http.post('/login?username=' + $scope.user + "&password=" + $scope.pass).then(function () {
                sessionStorage.setItem("username", $scope.user);
                sessionStorage.setItem("name", "");
                $window.location.href = '/';
            }, function () {
                $scope.errorMsg = "El usuario y/o la contraseña son incorrectos";
                $('.login-card').css("height", "620px");
            });
        };

        $scope.logout = function () {
            $http.post("/login").then(function () {
            }, function () {
                $window.location.href = '/login';
            }, function () {

            });

            sessionStorage.removeItem("username");
            sessionStorage.removeItem("name");
        };

        $scope.searchName = function () {

            $scope.user = sessionStorage.getItem("username");

            if (sessionStorage.getItem("name") == "") {
                $http.get('/person/show/' + $scope.user).then(function (response) {
                    var user = response.data;
                    $scope.name = user.name + ' ' + user.lastname;
                    sessionStorage.setItem("name", $scope.name);
                    console.log($scope.name);
                }, function () {
                    console.log($scope.name);
                });
            }

            $scope.name = sessionStorage.getItem("name");

        };

        $scope.searchName();

    });