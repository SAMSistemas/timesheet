angular.module('services')
    .service('projectService', projectService);

function projectService($http) {

    var vm = this;

    vm.getProjects = function(callbackSuccess, callbackFailure){
        $http.get('/project/all').then(callbackSuccess, callbackFailure);
    };

    vm.getEnabledProjectsByClient = function(clientName, callbackSuccess, callbackFailure){
        $http.get('/project/allEnabledByClient/' + clientName).then(callbackSuccess, callbackFailure);
    };

    vm.createProject = function(projectToCreate,callbackSuccess, callbackFailure){
        $http.post('/project/create', projectToCreate).then(callbackSuccess, callbackFailure);
    };

    vm.updateProject = function(projectToEdit, callbackSuccess, callbackFailure){
        $http.put('/project/update', projectToEdit).then(callbackSuccess, callbackFailure);
    };

}