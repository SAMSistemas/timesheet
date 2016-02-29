(function() {
    'use strict';

    angular
        .module('services')
        .service('taskTypeService', taskTypeService);

    taskTypeService.$inject = ['$http'];

    function taskTypeService($http) {

        var vm = this;

        vm.getTaskTypes = getTaskTypes;
        vm.createTaskType = createTaskType;
        vm.updateTaskType = updateTaskType;

        function getTaskTypes(callbackSuccess, callbackFailure) {
            $http.get('/taskTypes').then(callbackSuccess, callbackFailure);
        };

        function createTaskType(taskTypeToCreate, callbackSuccess, callbackFailure) {
            $http.post('/taskTypes', taskTypeToCreate).then(callbackSuccess, callbackFailure);
        };

        function updateTaskType(taskTypeToEdit, callbackSuccess, callbackFailure) {
            $http.put('/taskTypes/' + taskTypeToEdit.id, taskTypeToEdit).then(callbackSuccess, callbackFailure);
        };

    }

})();