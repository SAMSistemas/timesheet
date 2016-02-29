(function() {
    'use strict';

    angular
        .module('services')
        .service('loginService', loginService);

    loginService.$inject = ['$http'];

    function loginService($http) {

        var vm = this;

        vm.login = login;
        vm.logout = logout;

        function login(username, password, callbackSuccess, callbackFailure) {
            $http.post('/login?username=' + username + "&password=" + password).then(callbackSuccess, callbackFailure);
        };

        function logout(callbackSuccess, callbackFailure) {
            $http.post("/login").then(callbackSuccess, callbackFailure);
        };

    }

})();