angular.module('services')
    .service('workPositionService', workPositionService);

function workPositionService($http) {

    var vm = this;

    vm.getWorkPositions = function(callbackSuccess, callbackFailure){
        $http.get('/workPositions').then(callbackSuccess, callbackFailure);
    };
}