angular.module('services')
    .service('taskTypeService', taskTypeService);

function taskTypeService($http) {

    var vm = this;

    vm.getTaskTypes = function(callbackSuccess, callbackFailure){
        $http.get('/taskType/all').then(callbackSuccess, callbackFailure);
    };

    vm.createTaskType = function(taskTypeToCreate,callbackSuccess, callbackFailure){
        $http.post('/taskType/create', taskTypeToCreate).then(callbackSuccess, callbackFailure);
    };

    vm.updateTaskType = function(taskTypeToEdit, callbackSuccess, callbackFailure){
        $http.put('/taskType/update', taskTypeToEdit).then(callbackSuccess, callbackFailure);
    };

}