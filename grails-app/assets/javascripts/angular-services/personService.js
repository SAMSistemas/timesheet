(function() {
    'use strict';

    angular
        .module('services')
        .service('personService', personService);

    personService.$inject = ['$http'];

    function personService($http) {

        var vm = this;

        vm.show = show;
        vm.getPersonAvailableForProject = getPersonAvailableForProject;
        vm.get = get;
        vm.create = create;
        vm.update = update;

        function show(username, callbackSuccess, callbackFailure) {
            $http.get('/people?username=' + username).then(callbackSuccess, callbackFailure);
        };

        function getPersonAvailableForProject(projectName, callbackSuccess, callbackFailure) {
            $http.get('/people?availableFor=' + projectName).then(callbackSuccess, callbackFailure);
        };

        function get(callbackSuccess, callbackFailure) {
            $http.get('/people').then(callbackSuccess, callbackFailure);
        };

        function create(personToCreate, callbackSuccess, callbackFailure) {
            $http.post('/people', personToCreate).then(callbackSuccess, callbackFailure);
        };

        function update(personToEdit, callbackSuccess, callbackFailure) {
            $http.put('/people/' + personToEdit.id, personToEdit).then(callbackSuccess, callbackFailure);
        };

    }

})();