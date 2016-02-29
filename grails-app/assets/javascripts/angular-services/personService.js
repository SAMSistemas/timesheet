(function() {
    'use strict';

    angular
        .module('services')
        .service('personService', personService);

    personService.$inject = ['$http'];

    function personService($http) {

        var vm = this;

        vm.showPerson = showPerson;
        vm.getPersonAvailableForProject = getPersonAvailableForProject;
        vm.getPeople = getPeople;
        vm.createPerson = createPerson;
        vm.updatePerson = updatePerson;

        function showPerson(username, callbackSuccess, callbackFailure) {
            $http.get('/people?username=' + username).then(callbackSuccess, callbackFailure);
        };

        function getPersonAvailableForProject(projectName, callbackSuccess, callbackFailure) {
            $http.get('/people?availableFor=' + projectName).then(callbackSuccess, callbackFailure);
        };

        function getPeople(callbackSuccess, callbackFailure) {
            $http.get('/people').then(callbackSuccess, callbackFailure);
        };

        function createPerson(personToCreate, callbackSuccess, callbackFailure) {
            $http.post('/people', personToCreate).then(callbackSuccess, callbackFailure);
        };

        function updatePerson(personToEdit, callbackSuccess, callbackFailure) {
            $http.put('/people/' + personToEdit.id, personToEdit).then(callbackSuccess, callbackFailure);
        };

    }

})();