(function() {
    'use strict';

    angular
        .module('services')
        .service('clientService', clientService);

    clientService.$inject = ['$http'];

    function clientService($http) {

        var vm = this;

        vm.get = get;
        vm.getEnabled = getEnabled;
        vm.create = create;
        vm.update = update;

        function get(callbackSuccess, callbackFailure) {
            $http.get('/clients').then(callbackSuccess, callbackFailure);
        };

        function getEnabled(callbackSuccess, callbackFailure) {
            $http.get('/clients?enabled=true').then(callbackSuccess, callbackFailure);
        };

        function create(clientToCreate, callbackSuccess, callbackFailure) {
            $http.post('/clients', clientToCreate).then(callbackSuccess, callbackFailure);
        };

        function update(clientToEdit, callbackSuccess, callbackFailure) {
            $http.put('/clients/' + clientToEdit.id, clientToEdit).then(callbackSuccess, callbackFailure);
        };

    }

})();