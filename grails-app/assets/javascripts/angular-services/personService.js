angular.module('services')
    .service('personService', personService);

function personService($http) {

    var vm = this;

    vm.showPerson = function(username, callbackSuccess, callbackFailure){
        $http.get('/people?username=' + username).then(callbackSuccess, callbackFailure);
    };

    vm.getPersonAvailableForProject = function(projectName, callbackSuccess, callbackFailure) {
        $http.get('/people?availableFor=' + projectName).then(callbackSuccess, callbackFailure);
    };

    vm.getPeople = function(callbackSuccess, callbackFailure){
        $http.get('/people').then(callbackSuccess, callbackFailure);
    };

    vm.createPerson = function(personToCreate,callbackSuccess, callbackFailure){
        $http.post('/people', personToCreate).then(callbackSuccess, callbackFailure);
    };

    vm.updatePerson = function(personToEdit, callbackSuccess, callbackFailure){
        $http.put('/people/' + personToEdit.id, personToEdit).then(callbackSuccess, callbackFailure);
    };

}