(function() {
    'use strict';

    angular
        .module('services')
        .service('workPositionService', workPositionService);

    workPositionService.$inject = ['$http'];

    function workPositionService($http) {

        var vm = this;

        vm.getWorkPositions = getWorkPositions;

        function getWorkPositions(callbackSuccess, callbackFailure) {
            $http.get('/workPositions').then(callbackSuccess, callbackFailure);
        };
    }

})();