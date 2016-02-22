angular.module('services')
    .service('workPositionService', workPositionService);

function workPositionService($http) {

    var vm = this;

    vm.getWorkPositions = function(callbackSuccess, callbackFailure){
        $http.get('/workPosition/all').then(callbackSuccess, callbackFailure);
    };
}