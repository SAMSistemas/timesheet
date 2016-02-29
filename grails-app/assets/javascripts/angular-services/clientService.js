(function() {
    'use strict';

    angular
        .module('services')
        .service('clientService', clientService);

    clientService.$inject = ['$http'];

    function clientService($http) {

        var vm = this;

        vm.getClients = function (callbackSuccess, callbackFailure) {
            $http.get('/clients').then(callbackSuccess, callbackFailure);
        };

        vm.createClient = function (clientToCreate, callbackSuccess, callbackFailure) {
            $http.post('/clients', clientToCreate).then(callbackSuccess, callbackFailure);
        };

        vm.updateClient = function (clientToEdit, callbackSuccess, callbackFailure) {
            $http.put('/clients/' + clientToEdit.id, clientToEdit).then(callbackSuccess, callbackFailure);
        };

        vm.getEnabledClients = function (callbackSuccess, callbackFailure) {
            $http.get('/clients?enabled=true').then(callbackSuccess, callbackFailure);
        };

    }
})();