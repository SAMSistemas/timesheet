(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$window', 'loginService', 'personService', 'utilsService'];

    function LoginController($window, loginService, personService, utilsService) {

        /** Capturing controller instance **/
        var vm = this;

        vm.user = "";
        vm.pass = "";
        vm.name = "";

        vm.login = login;
        vm.logout = logout;
        vm.searchName = searchName;

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
            var user = response.data[0];
            vm.name = user.name + ' ' + user.lastname;
            sessionStorage.setItem("name", vm.name);
            utilsService.writeToLog(response, 'success');
        }

        function callbackError(response) {
            utilsService.writeToLog(response, 'error');
        }


        /** Controllers Functions **/

        function login() {
            loginService.postUserData(vm.user, vm.pass, loginSuccess, logInError);
        };

        function logout() {
            loginService.closeSession(logOutSuccess, callbackError);

            sessionStorage.removeItem("username");
            sessionStorage.removeItem("name");
        };

        function searchName() {
            vm.user = sessionStorage.getItem("username");

            if (sessionStorage.getItem("name") == "") {
                personService.showPerson(vm.user, showPersonSuccess, callbackError);
            }

            vm.name = sessionStorage.getItem("name");
        };

        searchName();

    }

})();