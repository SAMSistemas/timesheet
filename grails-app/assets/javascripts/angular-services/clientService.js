angular.module('services')
    .service('clientService', clientService);

function clientService($http) {

    var vm = this;

    vm.getClients = function(callbackSuccess, callbackFailure){
        $http.get('/client/all').then(callbackSuccess, callbackFailure);
    };

    vm.createClient = function(clientToCreate,callbackSuccess, callbackFailure){
        $http.post('/client/create', clientToCreate).then(callbackSuccess, callbackFailure);
    };

    vm.updateClient = function(clientToEdit, callbackSuccess, callbackFailure){
        $http.put('/client/update', clientToEdit).then(callbackSuccess, callbackFailure);
    };

    vm.getEnabledClients = function(callbackSuccess, callbackFailure){
        $http.get('/client/allEnabled').then(callbackSuccess,callbackFailure);
    };

}