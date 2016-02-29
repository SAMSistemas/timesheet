(function() {
    'use strict';

    angular
        .module('services')
        .service('taskTypeService', taskTypeService);

    taskTypeService.$inject = ['$http'];

    function taskTypeService($http) {

        var vm = this;

        vm.get = get;
        vm.create = create;
        vm.update = update;

        function get(callbackSuccess, callbackFailure) {
            $http.get('/taskTypes').then(callbackSuccess, callbackFailure);
        };

        function create(taskTypeToCreate, callbackSuccess, callbackFailure) {
            $http.post('/taskTypes', taskTypeToCreate).then(callbackSuccess, callbackFailure);
        };

        function update(taskTypeToEdit, callbackSuccess, callbackFailure) {
            $http.put('/taskTypes/' + taskTypeToEdit.id, taskTypeToEdit).then(callbackSuccess, callbackFailure);
        };

    }

})();