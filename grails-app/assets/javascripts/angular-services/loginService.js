(function() {
    'use strict';

    angular
        .module('services')
        .service('loginService', loginService);

    loginService.$inject = ['$http'];

    function loginService($http) {

        var vm = this;

        vm.postUserData = postUserData;
        vm.closeSession = closeSession;

        function postUserData(username, password, callbackSuccess, callbackFailure) {
            $http.post('/login?username=' + username + "&password=" + password).then(callbackSuccess, callbackFailure);
        };

        function closeSession(callbackSuccess, callbackFailure) {
            $http.post("/login").then(callbackSuccess, callbackFailure);
        };

    }

})();