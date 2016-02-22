angular.module('services')
    .service('personService', personService);

function personService($http) {

    var vm = this;

    vm.showPerson = function(username, callbackSuccess, callbackFailure){
        $http.get('/person/show/' + username).then(callbackSuccess, callbackFailure);
    };

    vm.getPersonAvailableForProject = function(projectName, callbackSuccess, callbackFailure) {
        $http.get('/person/allEnabledAndAvailableForProject/' + projectName).then(callbackSuccess, callbackFailure);
    };

    vm.getPeople = function(callbackSuccess, callbackFailure){
        $http.get('/person/all').then(callbackSuccess, callbackFailure);
    };

    vm.createPerson = function(personToCreate,callbackSuccess, callbackFailure){
        $http.post('/person/create', personToCreate).then(callbackSuccess, callbackFailure);
    };

    vm.updatePerson = function(personToEdit, callbackSuccess, callbackFailure){
        $http.put('/person/update', personToEdit).then(callbackSuccess, callbackFailure);
    };

}