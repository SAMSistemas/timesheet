(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$window', 'loginService', 'utilsService'];

    function LoginController($window, loginService, utilsService) {

        var vm = this;

        vm.user = "";
        vm.pass = "";

        vm.login = login;
        vm.logout = logout;


        /** Controllers Functions **/

        function login() {
            loginService.login(vm.user, vm.pass, loginSuccess, logInError);
        };

        function logout() {
            loginService.logout(logOutSuccess, callbackError);
        };


        /** Callback Handlers **/

        function loginSuccess() {
            sessionStorage.setItem("username", vm.user);
            sessionStorage.setItem("name", "");
            $window.location.href = '/';
        }

        function logOutSuccess() {
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("name");
            $window.location.href = '/login';
        }

        function logInError(response) {
            vm.errorMsg = "El usuario y/o la contraseña son incorrectos";
            $('.login-card').css("height", "620px");
            callbackError(response);
        }

        function callbackError(response) {
            utilsService.writeToLog(response, 'error');
        }

    }

})();