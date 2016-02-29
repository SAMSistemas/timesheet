(function() {
    'use strict';

    angular
        .module('services')
        .service('projectService', projectService);

    projectService.$inject = ['$http'];

    function projectService($http) {

        var vm = this;

        vm.get = get;
        vm.getEnabledProjectsByClient = getEnabledProjectsByClient;
        vm.create = create;
        vm.update = update;

        function get(callbackSuccess, callbackFailure) {
            $http.get('/projects').then(callbackSuccess, callbackFailure);
        };

        function getEnabledProjectsByClient(clientName, callbackSuccess, callbackFailure) {
            $http.get('/projects?enabled=true&client_name=' + clientName).then(callbackSuccess, callbackFailure);
        };

        function create(projectToCreate, callbackSuccess, callbackFailure) {
            $http.post('/projects', projectToCreate).then(callbackSuccess, callbackFailure);
        };

        function update(projectToEdit, callbackSuccess, callbackFailure) {
            $http.put('/projects/' + projectToEdit.id, projectToEdit).then(callbackSuccess, callbackFailure);
        };

    }
})();