//= require default
//= require_self

app.controller('loginController', function ($window, loginService, personService, utilsService) {

        /** Capturing controller instance **/
        var vm = this;

        vm.user = "";
        vm.pass = "";
        vm.name = "";


        /** Callback Handlers **/

        function loginSuccess() {
            sessionStorage.setItem("username", vm.user);
            sessionStorage.setItem("name", "");
            $window.location.href = '/';
        }

        function logOutSuccess() {
            $window.location.href = '/login';
        }

        function logInError(response) {
            vm.errorMsg = "El usuario y/o la contraseña son incorrectos";
            $('.login-card').css("height", "620px");
            callbackError(response);
        }

        function showPersonSuccess(response) {
            var user = response.data;
            vm.name = user.name + ' ' + user.lastname;
            sessionStorage.setItem("name", vm.name);
            utilsService.writeToLog(response, 'success');
        }

        function callbackError(response) {
            utilsService.writeToLog(response, 'error');
        }


        /** Controllers Functions **/

        vm.login = function () {
            loginService.postUserData(vm.user, vm.pass, loginSuccess, logInError);
        };

        vm.logout = function () {

            loginService.closeSession(logOutSuccess, callbackError);

            sessionStorage.removeItem("username");
            sessionStorage.removeItem("name");
        };

        vm.searchName = function () {

            vm.user = sessionStorage.getItem("username");

            if (sessionStorage.getItem("name") == "") {
                personService.showPerson(vm.user, showPersonSuccess, callbackError);
            }

            vm.name = sessionStorage.getItem("name");

        };

        vm.searchName();

    });