angular.module('services')
    .service('taskTypeService', taskTypeService);

function taskTypeService($http) {

    var vm = this;

    vm.getTaskTypes = function(callbackSuccess, callbackFailure){
        $http.get('/taskTypes').then(callbackSuccess, callbackFailure);
    };

    vm.createTaskType = function(taskTypeToCreate,callbackSuccess, callbackFailure){
        $http.post('/taskTypes', taskTypeToCreate).then(callbackSuccess, callbackFailure);
    };

    vm.updateTaskType = function(taskTypeToEdit, callbackSuccess, callbackFailure){
        $http.put('/taskTypes/' + taskTypeToEdit.id, taskTypeToEdit).then(callbackSuccess, callbackFailure);
    };

}