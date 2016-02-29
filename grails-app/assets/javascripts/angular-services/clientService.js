(function() {
    'use strict';

    angular
        .module('services')
        .service('clientService', clientService);

    clientService.$inject = ['$http'];

    function clientService($http) {

        var vm = this;

        vm.getClients = getClients;
        vm.getEnabledClients = getEnabledClients;
        vm.createClient = createClient;
        vm.updateClient = updateClient;

        function getClients(callbackSuccess, callbackFailure) {
            $http.get('/clients').then(callbackSuccess, callbackFailure);
        };

        function getEnabledClients(callbackSuccess, callbackFailure) {
            $http.get('/clients?enabled=true').then(callbackSuccess, callbackFailure);
        };

        function createClient(clientToCreate, callbackSuccess, callbackFailure) {
            $http.post('/clients', clientToCreate).then(callbackSuccess, callbackFailure);
        };

        function updateClient(clientToEdit, callbackSuccess, callbackFailure) {
            $http.put('/clients/' + clientToEdit.id, clientToEdit).then(callbackSuccess, callbackFailure);
        };

    }

})();