//= require default
//= require_self

app.controller('loginController', function ($http, $window) {

        /** Capturing controller instance **/
        var vm = this;

        vm.user = "";
        vm.pass = "";
        vm.name = "";

        vm.login = function () {
            $http.post('/login?username=' + vm.user + "&password=" + vm.pass).then(function () {
                sessionStorage.setItem("username", vm.user);
                sessionStorage.setItem("name", "");
                $window.location.href = '/';
            }, function () {
                vm.errorMsg = "El usuario y/o la contraseña son incorrectos";
                $('.login-card').css("height", "620px");
            });
        };

        vm.logout = function () {
            $http.post("/login").then(function () {
            }, function () {
                $window.location.href = '/login';
            }, function () {

            });

            sessionStorage.removeItem("username");
            sessionStorage.removeItem("name");
        };

        vm.searchName = function () {

            vm.user = sessionStorage.getItem("username");

            if (sessionStorage.getItem("name") == "") {
                $http.get('/person/show/' + vm.user).then(function (response) {
                    var user = response.data;
                    vm.name = user.name + ' ' + user.lastname;
                    sessionStorage.setItem("name", vm.name);
                    console.log(vm.name);
                }, function () {
                    console.log(vm.name);
                });
            }

            vm.name = sessionStorage.getItem("name");

        };

        vm.searchName();

    });