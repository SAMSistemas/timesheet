(function() {
    'use strict';

    angular
        .module('services')
        .service('projectService', projectService);

    projectService.$inject = ['$http'];

    function projectService($http) {

        var vm = this;

        vm.getProjects = getProjects;
        vm.getEnabledProjectsByClient = getEnabledProjectsByClient;
        vm.createProject = createProject;
        vm.updateProject = updateProject;

        function getProjects(callbackSuccess, callbackFailure) {
            $http.get('/projects').then(callbackSuccess, callbackFailure);
        };

        function getEnabledProjectsByClient(clientName, callbackSuccess, callbackFailure) {
            $http.get('/projects?enabled=true&client_name=' + clientName).then(callbackSuccess, callbackFailure);
        };

        function createProject(projectToCreate, callbackSuccess, callbackFailure) {
            $http.post('/projects', projectToCreate).then(callbackSuccess, callbackFailure);
        };

        function updateProject(projectToEdit, callbackSuccess, callbackFailure) {
            $http.put('/projects/' + projectToEdit.id, projectToEdit).then(callbackSuccess, callbackFailure);
        };

    }
})();