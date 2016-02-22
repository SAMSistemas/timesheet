angular.module('services')
    .service('loginService', loginService);

function loginService($http) {

    var vm = this;

    vm.postUserData = function(username, password, callbackSuccess, callbackFailure){
        $http.post('/login?username=' + username + "&password=" + password).then(callbackSuccess, callbackFailure);
    };

    vm.closeSession = function(callbackSuccess, callbackFailure) {
        $http.post("/login").then(callbackSuccess, callbackFailure);
    };

}