angular.module('services')
    .service('projectService', projectService);

function projectService($http) {

    var vm = this;

    vm.getProjects = function(callbackSuccess, callbackFailure){
        $http.get('/projects').then(callbackSuccess, callbackFailure);
    };

    vm.getEnabledProjectsByClient = function(clientName, callbackSuccess, callbackFailure){
        $http.get('/projects?enabled=true&client=' + clientName).then(callbackSuccess, callbackFailure);
    };

    vm.createProject = function(projectToCreate,callbackSuccess, callbackFailure){
        $http.post('/projects', projectToCreate).then(callbackSuccess, callbackFailure);
    };

    vm.updateProject = function(projectToEdit, callbackSuccess, callbackFailure){
        $http.put('/projects/' + projectToEdit.id, projectToEdit).then(callbackSuccess, callbackFailure);
    };

}