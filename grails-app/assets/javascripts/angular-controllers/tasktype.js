(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('TaskTypeController', TaskTypeController);

    TaskTypeController.$inject = ['taskTypeService', 'utilsService'];

    function TaskTypeController(taskTypeService, utilsService) {

        var vm = this;

        vm.taskTypes = [];
        vm.cuTaskType = null;
        vm.taskType = null;

        vm.cuForm = null;

        vm.new = openCreate;
        vm.edit = openUpdate;
        vm.createOrUpdate = createOrUpdate;

        taskTypeService.get(getSuccess, callbackError);


        /** Controller Functions **/

        function openCreate() {
            vm.cuTaskType = {name: "", enabled: true};
            vm.actionToPerform = "Crear";
            clearFields();
        }

        function openUpdate(taskType) {
            vm.cuTaskType = angular.copy(taskType);
            vm.taskType = taskType;
            vm.actionToPerform = "Editar";
            clearFields();
        }

        function clearFields() {
            // To clear the errors from previous edit forms
            if (vm.cuForm !== null) {
                vm.cuForm.name.$setValidity('available', true);
            }
        }

        function createOrUpdate() {
            if (vm.cuForm.$valid) {
                if (vm.cuTaskType.id) {
                    taskTypeService.update(vm.cuTaskType, updateSuccess, callbackError);
                } else {
                    taskTypeService.create(vm.cuTaskType, createSuccess, callbackError);
                }
            }
        }


        /** Callback Handlers **/

        function getSuccess(response) {
            vm.taskTypes = response.data;
        }

        function createSuccess(response) {
            utilsService.addToTable(vm.taskTypes, response.data);
        }

        function updateSuccess(response) {
            utilsService.updateInTable(vm.taskTypes, response.data);
        }

        function callbackError(response) {
            utilsService.writeToLog(response, 'error');
        }

    }

})();