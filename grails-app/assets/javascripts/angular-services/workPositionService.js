angular
    .module('services')
    .service('workPositionService', workPositionService);

workPositionService.$inject = ['$http'];

function workPositionService($http) {

    var vm = this;

    vm.getWorkPositions = function (callbackSuccess, callbackFailure) {
        $http.get('/workPositions').then(callbackSuccess, callbackFailure);
    };
}